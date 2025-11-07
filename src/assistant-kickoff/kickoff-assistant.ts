import type { ProjectConfig } from '../types.js';
import { buildInitialPrompt } from './build-initial-prompt.js';
import { displayInstructions } from './display-instructions.js';

/**
 * Kicks off the coding assistant with initial instructions.
 * 
 * @param params - Parameters object
 * @param params.projectPath - Absolute path to project root
 * @param params.config - Project configuration
 * @returns Promise that resolves when instructions are displayed
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
  displayInstructions({ projectPath, config, prompt });
};

