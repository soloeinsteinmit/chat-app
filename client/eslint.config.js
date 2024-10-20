import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import path from "path";

export default [
  { ignores: ["dist"] },
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    settings: {
      react: { version: "18.3" },
      "import-resolve": {
        alias: {
          map: [
            ["@components", path.resolve(__dirname, "./src/components")],
            ["@pages", path.resolve(__dirname, "./src/pages")],
            ["@utils", path.resolve(__dirname, "./src/utils")],
            ["@assets", path.resolve(__dirname, "./src/assets")],
            ["@hooks", path.resolve(__dirname, "./src/hooks")],
            ["@app", path.resolve(__dirname, "./src/app")],
            ["@services", path.resolve(__dirname, "./src/services")],
            ["@styles", path.resolve(__dirname, "./src/styles")],
            ["@context", path.resolve(__dirname, "./src/context")],
            ["@features", path.resolve(__dirname, "./src/features")],
          ],
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
      },
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs["jsx-runtime"].rules,
      ...reactHooks.configs.recommended.rules,
      "react/jsx-no-target-blank": "off",
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
  },
];
