import * as fs from "fs/promises";
import * as path from "path";
import chalk from "chalk";
import ora from "ora";
import { collectConfig } from "../config-collection/collect-config.js";
import { createProjectStructure } from "../project-scaffolding/create-project-structure.js";
import { setupMCPServers } from "../tool-setup/mcp/setup-mcp-servers.js";
import { setupAgnoTools } from "../tool-setup/agno/setup-agno-tools.js";
import { generateAgentsGuide } from "../documentation/generate-agents-guide.js";
import { kickoffAssistant } from "../assistant-kickoff/kickoff-assistant.js";
import type { ProjectConfig } from "../types.js";

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
    const config: ProjectConfig = await collectConfig();
    const absolutePath = path.resolve(process.cwd(), targetPath);

    const spinner = ora("Setting up your agent project...").start();

    try {
      await fs.mkdir(absolutePath, { recursive: true });

      await createProjectStructure({ projectPath: absolutePath, config });
      spinner.text = "Project structure created";

      await setupMCPServers({ projectPath: absolutePath, config });
      spinner.text = "MCP configuration set up";

      if (config.framework === "agno") {
        await setupAgnoTools({ projectPath: absolutePath });
        spinner.text = "Agno configuration set up";
      }

      await generateAgentsGuide({ projectPath: absolutePath, config });
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
