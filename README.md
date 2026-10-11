# Re:Style — Circular Fabric Studio & AI Design Assistant

An AI-powered sustainable fashion assistant that helps independent designers and boutiques turn leftover fabric inventory into trendy product ideas using live web research via TinyFish Search and Google Gemini LLM.

## Quickstart Guide

### Option 1: Start Both with 1 Command (Recommended)
```bash
npm run dev:all
```
This launches both the Express backend (`http://localhost:5000`) and the Vite React frontend (`http://localhost:5173`) in one unified terminal.

### Option 2: Run in Separate Terminals
1. **Terminal 1 (Backend Server):**
   ```bash
   npm run server
   ```
2. **Terminal 2 (Frontend App):**
   ```bash
   npm run dev
   ```

Then open `http://localhost:5173` in your browser.

---


Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.
