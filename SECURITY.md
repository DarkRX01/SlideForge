# Security Policy

## Supported Versions

We release patches for security vulnerabilities for the current major/minor line. Which versions are currently supported:

| Version | Supported          |
| ------- | ------------------ |
| 1.x     | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

**Please do not report security vulnerabilities through public GitHub issues.**

If you believe you've found a security vulnerability in SlideForge:

1. **Email** the maintainers (e.g. via GitHub profile or repo contact) with a clear description of the issue and steps to reproduce.
2. Include the affected component (frontend, backend, Electron, or a specific dependency) and environment (Windows/macOS/Linux, Node version).
3. Allow a reasonable time for a fix before any public disclosure.

We take security seriously. SlideForge runs AI and export logic locally; potential issues include:

- **Local AI / model loading**: Malicious or poisoned models could affect behavior; only use models from trusted sources (e.g. official Ollama/Stable Diffusion).
- **Export pipeline**: Puppeteer, FFmpeg, and file I/O could be abused if untrusted input reaches them; we validate and sanitize inputs.
- **Electron**: We keep Electron and dependencies updated; follow [Electron security best practices](https://www.electronjs.org/docs/latest/tutorial/security).

We'll acknowledge your report and work on a fix. We appreciate responsible disclosure.
