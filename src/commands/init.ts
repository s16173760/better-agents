import * as fs from "fs/promises";
import * as path from "path";
import chalk from "chalk";
import ora from "ora";
import { collectConfig } from "../config-collection/collect-config.js";
import { createProjectStructure } from "../project-scaffolding/create-project-structure.js";
import { getFrameworkProvider } from "../providers/frameworks/index.js";
import { buildAgentsGuide } from "../builders/agents-guide-builder.js";
import { buildMCPConfig } from "../builders/mcp-config-builder.js";
import { kickoffAssistant } from "../assistant-kickoff/kickoff-assistant.js";
import type { ProjectConfig } from "../types.js";

/**
 * Creates an animated rainbow banner with moving colors
 */
const showAnimatedBanner = (): Promise<void> => {
  return new Promise((resolve) => {
    // Define precise RGB colors for a smooth rainbow gradient
    const colors = [
      (text: string) => chalk.rgb(255, 0, 0)(text), // Red
      (text: string) => chalk.rgb(255, 127, 0)(text), // Orange
      (text: string) => chalk.rgb(255, 255, 0)(text), // Yellow
      (text: string) => chalk.rgb(0, 255, 0)(text), // Green
      (text: string) => chalk.rgb(0, 127, 255)(text), // Light Blue
      (text: string) => chalk.rgb(0, 0, 255)(text), // Blue
      (text: string) => chalk.rgb(139, 0, 255)(text), // Purple
      (text: string) => chalk.rgb(255, 0, 255)(text), // Magenta
    ];

    const superArt = [
      "  ███████╗██╗   ██╗██████╗ ███████╗██████╗ ",
      "  ██╔════╝██║   ██║██╔══██╗██╔════╝██╔══██╗",
      "  ███████╗██║   ██║██████╔╝█████╗  ██████╔╝",
      "  ╚════██║██║   ██║██╔═══╝ ██╔══╝  ██╔══██╗",
      "  ███████║╚██████╔╝██║     ███████╗██║  ██║",
      "  ╚══════╝ ╚═════╝ ╚═╝     ╚══════╝╚═╝  ╚═╝",
    ];

    const agentsArt = [
      "   █████╗  ██████╗ ███████╗███╗   ██╗████████╗███████╗",
      "  ██╔══██╗██╔════╝ ██╔════╝████╗  ██║╚══██╔══╝██╔════╝",
      "  ███████║██║  ███╗█████╗  ██╔██╗ ██║   ██║   ███████╗",
      "  ██╔══██║██║   ██║██╔══╝  ██║╚██╗██║   ██║   ╚════██║",
      "  ██║  ██║╚██████╔╝███████╗██║ ╚████║   ██║   ███████║",
      "  ╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚═╝  ╚═══╝   ╚═╝   ╚══════╝",
    ];

    let colorOffset = 0;
    let frameCount = 0;
    const maxFrames = 18;

    const interval = setInterval(() => {
      console.clear();
      console.log(); // Empty line at top

      // Print SUPER - each line gets one color, colors shift down over time
      superArt.forEach((line, lineIndex) => {
        const colorIndex = (colorOffset + lineIndex) % colors.length;
        console.log(colors[colorIndex](line));
      });

      console.log(); // Empty line between

      // Print AGENTS - continue the color progression
      agentsArt.forEach((line, lineIndex) => {
        const colorIndex =
          (colorOffset + superArt.length + lineIndex) % colors.length;
        console.log(colors[colorIndex](line));
      });

      console.log(); // Empty line at bottom

      colorOffset = (colorOffset - 1 + colors.length) % colors.length;
      frameCount++;

      if (frameCount >= maxFrames) {
        clearInterval(interval);
        resolve();
      }
    }, 150);
  });
};

/**
 * Initializes a new agent project with best practices.
 *
 * @param targetPath - Path where the project should be created (relative to cwd)
 * @returns Promise that resolves when initialization is complete
 *
 * @example
 * ```ts
 * await initCommand('my-agent-project');
 * ```
 */
export const initCommand = async (targetPath: string): Promise<void> => {
  try {
    // Show animated rainbow banner
    await showAnimatedBanner();

    console.log(
      chalk.bold.gray(
        "                    Building the future of AI agents\n"
      )
    );

    const config: ProjectConfig = await collectConfig();
    const absolutePath = path.resolve(process.cwd(), targetPath);

    const spinner = ora("Setting up your agent project...").start();

    try {
      await fs.mkdir(absolutePath, { recursive: true });

      await createProjectStructure({ projectPath: absolutePath, config });
      spinner.text = "Project structure created";

      // Set up framework-specific tools
      const frameworkProvider = getFrameworkProvider({
        framework: config.framework,
      });
      await frameworkProvider.setup({ projectPath: absolutePath });
      spinner.text = "Framework configuration set up";

      // Build MCP config using builder
      await buildMCPConfig({ projectPath: absolutePath, config });
      spinner.text = "MCP configuration set up";

      // Build AGENTS.md using builder
      await buildAgentsGuide({ projectPath: absolutePath, config });
      spinner.text = "AGENTS.md generated";

      spinner.succeed(chalk.green("Project setup complete!"));

      console.log(chalk.bold.cyan("\n✨ Your agent project is ready!\n"));
      console.log(chalk.gray(`Project location: ${absolutePath}\n`));

      await kickoffAssistant({ projectPath: absolutePath, config });
    } catch (error) {
      spinner.fail("Failed to set up project");
      throw error;
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(chalk.red(`\n❌ Error: ${error.message}`));
    } else {
      console.error(chalk.red("\n❌ An unexpected error occurred"));
    }
    process.exit(1);
  }
};
