/**
 * Builds the core principles section including testing pyramid for AGENTS.md.
 * 
 * @returns Markdown string for core principles section
 * 
 * @example
 * ```ts
 * const section = buildPrinciplesSection();
 * ```
 */
export const buildPrinciplesSection = (): string => {
  return `## Core Principles

### 1. Agent Testing Pyramid

Follow the **Agent Testing Pyramid** methodology (https://scenario.langwatch.ai/best-practices/the-agent-testing-pyramid):

- **Unit Tests (Foundation)**: Test deterministic components (API connections, data transformations, memory storage)
- **Evals & Optimization (Middle Layer)**: Evaluate and optimize probabilistic components (RAG retrieval, LLM responses, prompt quality)
- **Simulations (Peak)**: End-to-end validation of multi-turn conversations and real-world scenarios

### 2. Test Every Feature

**CRITICAL**: Every new agent feature MUST be tested with Scenario tests before considering it complete.

- Write simulation tests for multi-turn conversations
- Validate edge cases
- Ensure business value is delivered
- Test different conversation paths

### 3. Prompt Management

**ALWAYS** use LangWatch Prompt CLI for managing prompts:

- Store all prompts in the \`prompts/\` directory as YAML files
- Use versioning for prompt iterations
- Never hardcode prompts in your application code
- Use the LangWatch MCP to learn about prompt management: ask it "How do I use the prompt CLI?"

Example prompt structure:
\`\`\`yaml
# prompts/my_prompt.yaml
model: gpt-4o
temperature: 0.7
messages:
  - role: system
    content: |
      Your system prompt here
  - role: user
    content: |
      {{ user_input }}
\`\`\`

### 4. Evaluation-Driven Development

Create evaluations in Jupyter notebooks under \`tests/evaluations/\`:

- Use LangWatch Evaluations API to measure component performance
- Evaluate RAG retrieval accuracy
- Assess LLM response quality
- Track improvements over iterations
- Consult LangWatch MCP for evaluation best practices

---
`;
};

