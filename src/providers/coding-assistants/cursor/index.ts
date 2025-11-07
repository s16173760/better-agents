import * as fs from "fs/promises";
import * as path from "path";
import { launchWithTerminalControl } from "../../../utils/process-replacement.js";
import type { CodingAssistantProvider, MCPConfigFile } from "../index.js";

/**
 * Cursor CLI assistant provider implementation.
 * Writes MCP configuration as .mcp.json in project root.
 */
export const CursorCodingAssistantProvider: CodingAssistantProvider = {
  id: "cursor-cli",
  displayName: "Cursor CLI",
  command: "cursor-agent",

  async writeMCPConfig({ projectPath, config }) {
    const mcpConfigPath = path.join(projectPath, ".mcp.json");
    await fs.writeFile(mcpConfigPath, JSON.stringify(config, null, 2));
  },

  async launch({ projectPath, prompt }: { projectPath: string; prompt: string }): Promise<void> {
    try {
      // Launch cursor-agent with full terminal control
      // This blocks until cursor-agent exits
      launchWithTerminalControl("cursor-agent", [prompt], { cwd: projectPath });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to launch Cursor CLI: ${error.message}`);
      }
      throw error;
    }
  },
};

