# Quick Start Guide

Get started with Better Agents in 2 minutes! 🚀

## Installation

```bash
npm install -g @langwatch/better-agents
```

Or use npx (no installation):

```bash
npx @langwatch/better-agents init my-agent
```

## Usage

```bash
better-agents init my-agent
```

Follow the prompts:

1. **Language**: Python or TypeScript
2. **Framework**: Agno (Python) or Mastra (TypeScript)
3. **Coding Assistant**: Claude Code
4. **LLM Provider**: OpenAI
5. **OpenAI Key**: Your API key (starts with `sk-`)
6. **LangWatch Key**: Get from https://app.langwatch.ai/authorize
7. **Goal**: Describe what you want to build

## What You Get

```
my-agent/
├── app/                    # Your agent code
├── prompts/                # Versioned prompts
├── tests/
│   ├── evaluations/       # Performance evaluation
│   └── scenarios/         # End-to-end tests
├── AGENTS.md              # Development guidelines
└── .mcp.json              # Coding assistant config
```

## Next Steps

```bash
cd my-agent
claude "Build my agent"  # or your coding assistant
```

Your coding assistant is now an expert in:
- Your chosen framework (Agno/Mastra)
- LangWatch best practices
- Prompt management
- Agent testing

## Key Features

✅ **Agent Testing Pyramid** - Unit tests + Evals + Simulations
✅ **Prompt Management** - Version controlled prompts
✅ **MCP Integration** - Expert guidance built-in
✅ **Production Ready** - Best practices from day one

## Resources

- **Docs**: https://scenario.langwatch.ai/
- **Dashboard**: https://app.langwatch.ai/
- **Full Walkthrough**: See `examples/WALKTHROUGH.md`

---

Questions? Open an issue on [GitHub](https://github.com/langwatch/better-agents)!

