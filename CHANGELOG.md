# Changelog

All notable changes to Better Agents will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2025-11-07

### Added
- Initial release of Better Agents CLI
- Interactive project initialization with `better-agents init`
- Support for Python and TypeScript projects
- Integration with Agno framework (Python)
- Integration with Mastra framework (TypeScript)
- Claude Code coding assistant support
- OpenAI LLM provider support
- LangWatch integration for:
  - Prompt management via Prompt CLI
  - Scenario-based testing
  - Evaluation notebooks
- MCP (Model Context Protocol) configuration for:
  - LangWatch MCP server
  - Mastra MCP server (for TypeScript projects)
  - Agno .cursorrules and llms.txt (for Python projects)
- Standardized project structure with:
  - Source directory (`app/` or `src/`)
  - `prompts/` directory for versioned prompts
  - `tests/evaluations/` for Jupyter notebooks
  - `tests/scenarios/` for scenario tests
- Comprehensive AGENTS.md file with:
  - Framework-specific guidelines
  - Agent Testing Pyramid methodology
  - LangWatch best practices
  - Development workflow instructions
- Environment variable management with `.env` files
- Automatic `.gitignore` generation
- Sample files and templates for quick start

### Documentation
- Comprehensive README with usage examples
- CONTRIBUTING guide for developers
- MIT License
- Example project structures

[0.1.0]: https://github.com/langwatch/better-agents/releases/tag/v0.1.0

