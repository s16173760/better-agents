import chalk from 'chalk';
import type { ProjectConfig } from '../types.js';
import { buildInitialPrompt } from './build-initial-prompt.js';
import { getCodingAssistantProvider } from '../providers/coding-assistants/index.js';

/**
 * Kicks off the coding assistant with initial instructions.
 *
 * @param params - Parameters object
 * @param params.projectPath - Absolute path to project root
 * @param params.config - Project configuration
 * @returns Promise that resolves when assistant is launched
 *
 * @example
 * ```ts
 * await kickoffAssistant({ projectPath: '/path/to/project', config });
 * ```
 */
export const kickoffAssistant = async ({
  projectPath,
  config
}: {
  projectPath: string;
  config: ProjectConfig;
}): Promise<void> => {
  const prompt = buildInitialPrompt({ config });
  const provider = getCodingAssistantProvider({ assistant: config.codingAssistant });

  console.log(chalk.bold.cyan('\n✨ Project setup complete!\n'));
  console.log(chalk.gray('Initial prompt:\n'));
  console.log(chalk.white(`"${prompt}"\n`));
  console.log(chalk.gray(`Project location: ${projectPath}\n`));

  // Let the provider handle its own launch behavior
  await provider.launch({ projectPath, prompt });
};

