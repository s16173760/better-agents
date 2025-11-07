import type { AgentFramework, ProgrammingLanguage } from "../../types.js";

/**
 * Builds framework choices based on the selected programming language.
 *
 * @param params - Parameters object
 * @param params.language - The selected programming language
 * @returns Array of framework choices for the language
 *
 * @example
 * ```ts
 * const choices = buildFrameworkChoices({ language: 'python' });
 * // Returns: [{ name: 'Agno', value: 'agno' }]
 * ```
 */
export const buildFrameworkChoices = ({
  language,
}: {
  language: ProgrammingLanguage;
}) => {
  return language === "python"
    ? [{ name: "Agno", value: "agno" as AgentFramework }]
    : [{ name: "Mastra", value: "mastra" as AgentFramework }];
};
