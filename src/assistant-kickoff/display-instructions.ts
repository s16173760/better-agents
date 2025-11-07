import chalk from 'chalk';
import type { ProjectConfig } from '../types.js';

/**
 * Displays kickoff instructions to the user in the terminal.
 * 
 * @param params - Parameters object
 * @param params.projectPath - Absolute path to project root
 * @param params.config - Project configuration
 * @param params.prompt - The initial prompt to display
 * 
 * @example
 * ```ts
 * displayInstructions({ projectPath: '/path', config, prompt: 'Start building...' });
 * ```
 */
export const displayInstructions = ({ 
  projectPath, 
  config, 
  prompt 
}: { 
  projectPath: string; 
  config: ProjectConfig; 
  prompt: string; 
}): void => {
  console.log(chalk.bold.cyan('\n🤖 Starting your coding assistant...\n'));

  console.log(chalk.gray('Initial prompt:'));
  console.log(chalk.white(`"${prompt}"\n`));

  if (config.codingAssistant === 'claude-code') {
    console.log(chalk.yellow('To start Claude Code with this prompt, run:\n'));
    console.log(chalk.cyan(`  cd ${projectPath}`));
    console.log(chalk.cyan(`  claude "${prompt}"`));
    console.log();
    console.log(chalk.gray('Or, if you prefer to start Claude Code manually:'));
    console.log(chalk.cyan(`  cd ${projectPath}`));
    console.log(chalk.cyan(`  claude`));
    console.log();
    console.log(chalk.bold.green('Happy coding! 🚀\n'));
  }
};

