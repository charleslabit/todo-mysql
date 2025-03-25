import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Example: Disabling the rule react/no-unescaped-entities
      "react/no-unescaped-entities": "off",

      // Add any other rules you'd like to disable or customize
      "no-console": "warn", // Example: Warnings for console logs
      "react/prop-types": "off", // Example: Disabling prop-types validation
    },
  },
];

export default eslintConfig;
