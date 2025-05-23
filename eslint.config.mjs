import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: ["next/core-web-vitals", "next/typescript"],
    rules: {
      // Disable unescaped entities warning in JSX
      "react/no-unescaped-entities": "off",

      // Disable custom font warning in _document.js
      "@next/next/no-page-custom-font": "off",

      // (Optional) Add more rules here as needed
    },
  }),
];

export default eslintConfig;
