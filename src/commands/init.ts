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
 * Creates an animated rainbow banner with moving colors and flying Superman
 */
const showAnimatedBanner = (): Promise<void> => {
  return new Promise((resolve) => {
    // Purple gradient for letters
    const colors = [
      (text: string) => chalk.ansi256(93)(text), // Light purple
      (text: string) => chalk.ansi256(92)(text), // Medium-light purple
      (text: string) => chalk.ansi256(91)(text), // Medium purple
      (text: string) => chalk.ansi256(127)(text), // Deep purple
      (text: string) => chalk.ansi256(129)(text), // Purple
      (text: string) => chalk.ansi256(93)(text), // Light purple (cycle back)
    ];

    // Original Superman art
    const supermanArtOriginal = [
      "                                  ",
      "                                  ",
      "                  ███░            ",
      "                █████████         ",
      "             ░████▒░░█████        ",
      "             ▓██░░░░░░░█░░█       ",
      "            ░░░░░░░░░▒░░▒░▒       ",
      "              ░░░░░░░░░░░░        ",
      "         ░▓▓▓▓▓▓░░░░░░░░░░▒░░░░   ",
      "     ▓▓▓▓▓▓░░▓▓▓▓▓▒░░░░▒▓▓▓▓░░    ",
      "       ▓▓▓▓▓▒▓▓▓░▓░▓▓▓░           ",
      "        ░▓▓▓▓▓▓░▓▓░░              ",
      "      ▓▓▓▓▓▓▓▓                    ",
      "      ▓▓░                         ",
      "                                  ",
      "                                  ",
      "                                  ",
    ];

    // Reverse shading for better display on dark terminals
    // Swap light and dark characters so face appears light and hair appears dark
    const reverseShading = (line: string): string => {
      return line
        .split('')
        .map((char) => {
          switch (char) {
            case '░': return '█'; // Light shade → Solid
            case '▒': return '▓'; // Medium shade → Dark shade
            case '▓': return '▒'; // Dark shade → Medium shade
            case '█': return '░'; // Solid → Light shade
            default: return char;
          }
        })
        .join('');
    };

    const supermanArt = supermanArtOriginal.map(reverseShading);

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

      // Calculate Superman's vertical offset for flying animation
      // Using sine wave for smooth up and down motion
      const flyingOffset = Math.round(
        2 * Math.sin((frameCount * Math.PI) / 6)
      );

      // Calculate total height: Superman, SUPER, spacing, and AGENTS
      const totalTextLines = superArt.length + 1 + agentsArt.length; // +1 for spacing
      const maxLines = Math.max(supermanArt.length, totalTextLines);

      for (let i = 0; i < maxLines; i++) {
        let line = "";

        // Add Superman with flying offset
        const supermanLineIndex = i - flyingOffset;
        if (
          supermanLineIndex >= 0 &&
          supermanLineIndex < supermanArt.length
        ) {
          line += supermanArt[supermanLineIndex]; // Use default terminal color
        } else {
          // Add empty space when Superman line is out of bounds
          line += " ".repeat(supermanArt[0].length);
        }

        // Add spacing between Superman and text
        line += "  ";

        // Push text down by 2 lines
        const textLineIndex = i - 2;

        // Add SUPER text (starting at line 2)
        if (textLineIndex >= 0 && textLineIndex < superArt.length) {
          const colorIndex = (colorOffset + textLineIndex) % colors.length;
          line += colors[colorIndex](superArt[textLineIndex]);
        }
        // Add empty line between SUPER and AGENTS
        else if (textLineIndex === superArt.length) {
          // Just spacing, no text
        }
        // Add AGENTS text
        else if (textLineIndex > superArt.length && textLineIndex - superArt.length - 1 < agentsArt.length) {
          const agentsLineIndex = textLineIndex - superArt.length - 1;
          const colorIndex =
            (colorOffset + superArt.length + agentsLineIndex) % colors.length;
          line += colors[colorIndex](agentsArt[agentsLineIndex]);
        }

        console.log(line);
      }

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
