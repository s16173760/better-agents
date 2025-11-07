import * as fs from "fs/promises";
import * as path from "path";

const AGNO_LLMS_TXT_URL = "https://docs.agno.com/llms.txt";

/**
 * Fetches and saves Agno llms.txt documentation.
 *
 * @param params - Parameters object
 * @param params.projectPath - Absolute path to project root
 * @returns Promise that resolves when file is written
 *
 * @example
 * ```ts
 * await fetchAgnoDocs({ projectPath: '/path/to/project' });
 * ```
 */
export const fetchAgnoDocs = async ({
  projectPath,
}: {
  projectPath: string;
}): Promise<void> => {
  try {
    const response = await fetch(AGNO_LLMS_TXT_URL);
    if (!response.ok) {
      throw new Error(`Failed to fetch llms.txt: ${response.statusText}`);
    }
    const content = await response.text();
    await fs.writeFile(path.join(projectPath, "llms.txt"), content);
  } catch (error) {
    console.warn("Warning: Could not fetch Agno llms.txt file");
    await fs.writeFile(
      path.join(projectPath, "llms.txt"),
      "# Agno LLMs documentation\n# Please manually download from: https://docs.agno.com/llms.txt\n"
    );
  }
};
