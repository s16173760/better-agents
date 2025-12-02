import * as fs from "fs/promises";
import * as path from "path";

const DEFAULT_GITIGNORE = `# Environment variables
.env
.env.local
.env.*.local

# Dependencies
node_modules/
__pycache__/
*.pyc
venv/
.venv/

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Build outputs
dist/
build/
*.egg-info/

# Better Agents
.better-agents/
`;

/**
 * Ensures .gitignore exists and contains Better Agents entries.
 * If .gitignore exists, appends ".better-agents/" if not already present.
 * If .gitignore doesn't exist, creates a default one with common patterns.
 *
 * @param params - Parameters object
 * @param params.projectPath - Absolute path to project root
 * @returns Promise that resolves when file is updated/created
 *
 * @example
 * ```ts
 * await ensureGitignore({ projectPath: '/path/to/project' });
 * ```
 */
export const ensureGitignore = async ({
  projectPath,
}: {
  projectPath: string;
}): Promise<void> => {
  const gitignorePath = path.join(projectPath, ".gitignore");

  try {
    // Try to read existing .gitignore
    const existingContent = await fs.readFile(gitignorePath, "utf-8");

    // Check if .better-agents is already in there
    if (!existingContent.includes(".better-agents")) {
      // Append Better Agents section
      const appendContent = `
# Better Agents
.better-agents/
`;
      await fs.appendFile(gitignorePath, appendContent);
    }
  } catch {
    // File doesn't exist, create default
    await fs.writeFile(gitignorePath, DEFAULT_GITIGNORE);
  }
};
