import * as fs from "fs/promises";
import * as path from "path";

const AGNO_CURSORRULES_URL =
  "https://raw.githubusercontent.com/agno-agi/agno/main/.cursorrules";

/**
 * Fetches and saves Agno .cursorrules file.
 *
 * @param params - Parameters object
 * @param params.projectPath - Absolute path to project root
 * @returns Promise that resolves when file is written
 *
 * @example
 * ```ts
 * await fetchAgnoRules({ projectPath: '/path/to/project' });
 * ```
 */
export const fetchAgnoRules = async ({
  projectPath,
}: {
  projectPath: string;
}): Promise<void> => {
  try {
    const response = await fetch(AGNO_CURSORRULES_URL);
    if (!response.ok) {
      throw new Error(`Failed to fetch .cursorrules: ${response.statusText}`);
    }
    const content = await response.text();
    await fs.writeFile(path.join(projectPath, ".cursorrules"), content);
  } catch (error) {
    console.warn("Warning: Could not fetch Agno .cursorrules file");
    await fs.writeFile(
      path.join(projectPath, ".cursorrules"),
      "# Agno cursor rules\n# Please manually download from: https://raw.githubusercontent.com/agno-agi/agno/main/.cursorrules\n"
    );
  }
};
