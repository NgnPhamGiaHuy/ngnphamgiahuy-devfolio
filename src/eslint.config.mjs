import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

const eslintConfig = [
    ...compat.extends("next/core-web-vitals", "next/typescript"),
    {
        files: ["**/*.{js,jsx,ts,tsx}"],
        ignores: [
            "node_modules/**",
            ".next/**",
            "out/**",
            "build/**",
            "dist/**",
            "*.config.js",
            "*.config.mjs",
            "*.config.ts",
            "sanity/**",
            "public/**",
            "styles/**",
        ],
        rules: {
            "no-unused-vars": "warn",
            "no-console": "warn",
            "prefer-const": "error",
            "no-var": "error",
            "@typescript-eslint/no-explicit-any": "off",
            "@typescript-eslint/no-unused-vars": "warn",
            "react-hooks/exhaustive-deps": "warn",
        },
    },
];

export default eslintConfig;
