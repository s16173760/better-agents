import * as fs from 'fs/promises';
import * as path from 'path';
import type { ProjectConfig } from '../../types.js';

type MCPServer = {
  command: string;
  args?: string[];
  type?: string;
};

type MCPConfig = {
  mcpServers: Record<string, MCPServer>;
};

/**
 * Sets up MCP (Model Context Protocol) server configuration.
 * 
 * @param params - Parameters object
 * @param params.projectPath - Absolute path to project root
 * @param params.config - Project configuration
 * @returns Promise that resolves when MCP config is written
 * 
 * @example
 * ```ts
 * await setupMCPServers({ projectPath: '/path/to/project', config });
 * ```
 */
export const setupMCPServers = async ({ 
  projectPath, 
  config 
}: { 
  projectPath: string; 
  config: ProjectConfig; 
}): Promise<void> => {
  const mcpConfig: MCPConfig = {
    mcpServers: {},
  };

  // Always add LangWatch MCP
  mcpConfig.mcpServers.langwatch = {
    command: 'npx',
    args: ['-y', '@langwatch/mcp-server', `--apiKey=${config.langwatchApiKey}`],
  };

  // Add framework-specific MCP
  if (config.framework === 'mastra') {
    mcpConfig.mcpServers.mastra = {
      type: 'stdio',
      command: 'npx',
      args: ['-y', '@mastra/mcp-docs-server'],
    };
  }

  // For Claude Code, save as .mcp.json in the project root
  if (config.codingAssistant === 'claude-code') {
    const mcpConfigPath = path.join(projectPath, '.mcp.json');
    await fs.writeFile(
      mcpConfigPath,
      JSON.stringify(mcpConfig, null, 2)
    );
  }
};

