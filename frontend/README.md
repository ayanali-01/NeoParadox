# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## Deployment environment variables

Set `VITE_API_URL` to the backend origin (for example, `https://api.example.com`).
The frontend appends `/api/...` to this URL. If it is unset, local development
uses `http://localhost:3000`.

Set `FRONTEND_URL` in the backend environment to the deployed frontend origin
(for example, `https://shop.example.com`). Set `BACKEND_URL` to the deployed
backend origin so Google OAuth can build its callback URL. You can instead set
`GOOGLE_CALLBACK_URL` to the full callback URL directly. These backend URLs
default to their localhost origins for development.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
