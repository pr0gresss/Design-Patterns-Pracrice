import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import jest from "eslint-plugin-jest";
import path from "path";

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
  {
    ignores: [
      "dist/**",
      "coverage/**",
      "node_modules/**",
      "*.config.js",
      "*.config.mjs",
      "*.config.cjs",
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["src/**/*.{ts,tsx,js}"],
    plugins: {
      jest,
      "@typescript-eslint": tseslint.plugin,
    },
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parser: tseslint.parser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: path.resolve(),
      },
      globals: {
        ...globals.node,
        ...globals.jest,
      },
    },

    rules: {
      /* ---------- Core JavaScript ---------- */
      "no-var": "error",
      "prefer-const": "error",
      "no-debugger": "error",
      "no-console": ["warn", { allow: ["warn", "error"] }],
      eqeqeq: ["error", "always"],
      curly: ["error", "all"],
      "object-shorthand": ["error", "always"],
      "arrow-body-style": ["error", "as-needed"],
      "no-param-reassign": ["error", { props: true }],
      "no-multi-spaces": "error",

      /* ---------- TypeScript ---------- */
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-non-null-assertion": "error",
      "@typescript-eslint/explicit-module-boundary-types": "warn",
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { prefer: "type-imports" },
      ],
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/array-type": [
        "error",
        { default: "array-simple" },
      ],
      "@typescript-eslint/ban-ts-comment": [
        "error",
        { "ts-expect-error": "allow-with-description" },
      ],

      /* ---------- Style / Formatting ---------- */
      indent: ["error", "tab"],
      quotes: ["error", "double", { avoidEscape: true }],
      semi: ["error", "always"],
      "comma-dangle": ["error", "always-multiline"],
      "space-before-blocks": ["error", "always"],
      "keyword-spacing": ["error", { before: true, after: true }],
      "object-curly-spacing": ["error", "always"],
      "array-bracket-spacing": ["error", "never"],
      "no-trailing-spaces": "error",
      "eol-last": ["error", "always"],

      /* ---------- Jest Testing ---------- */
      "jest/no-disabled-tests": "warn",
      "jest/no-focused-tests": "error",
      "jest/consistent-test-it": ["error", { fn: "it" }],
    },
  },
];
