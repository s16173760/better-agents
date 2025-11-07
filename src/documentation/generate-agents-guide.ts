import * as fs from "fs/promises";
import * as path from "path";
import type { ProjectConfig } from "../types.js";
import { buildOverviewSection } from "./sections/overview-section.js";
import { buildPrinciplesSection } from "./sections/principles-section.js";
import { buildFrameworkSection } from "./sections/framework-section.js";
import { buildWorkflowSection } from "./sections/workflow-section.js";

/**
 * Generates the AGENTS.md guide file with development best practices.
 *
 * @param params - Parameters object
 * @param params.projectPath - Absolute path to project root
 * @param params.config - Project configuration
 * @returns Promise that resolves when file is written
 *
 * @example
 * ```ts
 * await generateAgentsGuide({ projectPath: '/path/to/project', config });
 * ```
 */
export const generateAgentsGuide = async ({
  projectPath,
  config,
}: {
  projectPath: string;
  config: ProjectConfig;
}): Promise<void> => {
  const content = [
    buildOverviewSection({ config }),
    buildPrinciplesSection(),
    buildFrameworkSection({ config }),
    buildWorkflowSection({ config }),
  ].join("\n");

  await fs.writeFile(path.join(projectPath, "AGENTS.md"), content);
};
