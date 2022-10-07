/// <reference types="vitest" />

import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        globals: true,
        environment: "node",
        coverage: {
            lines: 90,
            functions: 90,
            branches: 90,
            statements: 90,
            reporter: ["lcov", "text", "html"],
            exclude: ["node_modules/", "**/*.spec.ts"],
        },
    },
});
