import type { ProjectConfig } from '../../types.js';

/**
 * Builds framework-specific guidelines section for AGENTS.md.
 * 
 * @param params - Parameters object
 * @param params.config - Project configuration
 * @returns Markdown string for framework guidelines section
 * 
 * @example
 * ```ts
 * const section = buildFrameworkSection({ config });
 * ```
 */
export const buildFrameworkSection = ({ config }: { config: ProjectConfig }): string => {
  if (config.framework === 'agno') {
    return `## Framework-Specific Guidelines

### Agno Framework

**Always follow Agno best practices:**

- Refer to the \`.cursorrules\` file for Agno-specific coding standards
- Consult \`llms.txt\` for comprehensive Agno documentation
- Use Agno's agent building patterns and conventions
- Follow Agno's recommended project structure

**Key Agno Resources:**
- Documentation: https://docs.agno.com/
- GitHub: https://github.com/agno-agi/agno
- Local files: \`.cursorrules\` and \`llms.txt\`

**When implementing agent features:**
1. Review Agno documentation for best practices
2. Use Agno's built-in tools and utilities
3. Follow Agno's patterns for agent state management
4. Leverage Agno's testing utilities

---
`;
  } else {
    return `## Framework-Specific Guidelines

### Mastra Framework

**Always use the Mastra MCP for learning:**

- The Mastra MCP server provides real-time documentation
- Ask it questions about Mastra APIs and best practices
- Follow Mastra's recommended patterns for agent development

**When implementing agent features:**
1. Consult the Mastra MCP: "How do I [do X] in Mastra?"
2. Use Mastra's built-in agent capabilities
3. Follow Mastra's TypeScript patterns and conventions
4. Leverage Mastra's integration ecosystem

**Example questions for Mastra MCP:**
- "How do I create an agent in Mastra?"
- "What's the best way to handle tools in Mastra?"
- "How do I manage agent state in Mastra?"

---
`;
  }
};

