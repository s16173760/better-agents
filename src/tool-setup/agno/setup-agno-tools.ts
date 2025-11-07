import { fetchAgnoRules } from "./fetch-agno-rules.js";
import { fetchAgnoDocs } from "./fetch-agno-docs.js";

/**
 * Sets up all Agno-specific tools and configuration files.
 *
 * @param params - Parameters object
 * @param params.projectPath - Absolute path to project root
 * @returns Promise that resolves when setup is complete
 *
 * @example
 * ```ts
 * await setupAgnoTools({ projectPath: '/path/to/project' });
 * ```
 */
export const setupAgnoTools = async ({
  projectPath,
}: {
  projectPath: string;
}): Promise<void> => {
  await fetchAgnoRules({ projectPath });
  await fetchAgnoDocs({ projectPath });
};
