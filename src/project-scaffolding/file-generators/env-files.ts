import * as fs from "fs/promises";
import * as path from "path";

/**
 * Generates .env.example and .env files with API key placeholders.
 *
 * @param params - Parameters object
 * @param params.projectPath - Absolute path to project root
 * @param params.openaiApiKey - OpenAI API key to include in .env
 * @param params.langwatchApiKey - LangWatch API key to include in .env
 * @returns Promise that resolves when files are written
 *
 * @example
 * ```ts
 * await generateEnvFiles({ projectPath: '/path', openaiApiKey: 'sk-...', langwatchApiKey: 'sk-lw-...' });
 * ```
 */
export const generateEnvFiles = async ({
  projectPath,
  openaiApiKey,
  langwatchApiKey,
}: {
  projectPath: string;
  openaiApiKey: string;
  langwatchApiKey: string;
}): Promise<void> => {
  const envExample = `# LLM Provider API Keys
OPENAI_API_KEY=your_openai_api_key_here

# LangWatch
LANGWATCH_API_KEY=your_langwatch_api_key_here
`;

  await fs.writeFile(path.join(projectPath, ".env.example"), envExample);

  const envContent = `# LLM Provider API Keys
OPENAI_API_KEY=${openaiApiKey}

# LangWatch
LANGWATCH_API_KEY=${langwatchApiKey}
`;

  await fs.writeFile(path.join(projectPath, ".env"), envContent);
};
