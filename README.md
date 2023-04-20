### Configured as follow

#### Set up vite
```bash
npm create vite@latest
```

#### Set up ESlint and Prettier on the project.
```bash
npm install -D eslint eslint-config-airbnb eslint-config-prettier eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-prettier eslint-plugin-react eslint-plugin-react-hooks
```
```bash
npm install -D @typescript-eslint/eslint-plugin @typescript-eslint/parser
```

#### Create a `.eslintrc.js` and add the following content to it.
```javascript
module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 13,
        sourceType: 'module',
    },
    plugins: ['react', '@typescript-eslint'],
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'airbnb',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
    ],
    env: {
        browser: true,
        es2021: true,
    },
    rules: {
        '@typescript-eslint/interface-name-prefix': 'on',
        '@typescript-eslint/explicit-function-return-type': 'on',
        '@typescript-eslint/explicit-module-boundary-types': 'on',
        '@typescript-eslint/no-explicit-any': 'on',
    },
}
```

#### Create a `.prettierrc` and add the following content.
```json
{
    "singleQuote": true,
    "semi": true,
    "tabWidth": 2,
    "trailingComma": "all",
    "useTabs": false,
    "printWidth": 80
}
```

#### Add the following content to the existing `vite.config.js` file.
```javascript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
});
```

#### install `vite-tsconfig-paths`
```bash
npm install vite-tsconfig-paths
```
