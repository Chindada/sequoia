import pluginVitest from "@vitest/eslint-plugin";
import skipFormatting from "@vue/eslint-config-prettier/skip-formatting";
import {
  configureVueProject,
  defineConfigWithVueTs,
  vueTsConfigs
} from "@vue/eslint-config-typescript";
import pluginPlaywright from "eslint-plugin-playwright";
import pluginVue from "eslint-plugin-vue";
import { globalIgnores } from "eslint/config";
import typescriptEslint from "typescript-eslint";

configureVueProject({ scriptLangs: ["ts", "tsx"] });

export default defineConfigWithVueTs(
  {
    name: "app",
    files: ["**/*.{ts,mts,tsx,vue}"]
  },
  globalIgnores(["**/dist/**", "**/dist-ssr/**", "**/coverage/**", "**/dist-electron/**"]),
  pluginVue.configs["flat/recommended"],
  vueTsConfigs.recommended,
  {
    rules: {
      "no-console": "error",
      "no-unused-vars": "error",
      "@typescript-eslint/no-unused-expressions": "error"
    },
    languageOptions: {
      parserOptions: {
        parser: typescriptEslint.parser
      }
    }
  },
  {
    files: ["src/pages/**/*.vue"],
    rules: {
      "vue/multi-word-component-names": "off"
    }
  },
  {
    files: ["src/**/*.vue"],
    rules: {
      "vue/multi-word-component-names": "off",
      "vue/attributes-order": [
        "warn",
        {
          order: [
            "DEFINITION",
            "LIST_RENDERING",
            "CONDITIONALS",
            "RENDER_MODIFIERS",
            "GLOBAL",
            ["UNIQUE", "SLOT"],
            "TWO_WAY_BINDING",
            "OTHER_DIRECTIVES",
            "OTHER_ATTR",
            "EVENTS",
            "CONTENT"
          ],
          alphabetical: true
        }
      ]
    }
  },
  {
    ...pluginVitest.configs.recommended,
    files: ["src/**/__tests__/*"]
  },
  {
    ...pluginPlaywright.configs["flat/recommended"],
    files: ["e2e/**/*.{test,spec}.{js,ts,jsx,tsx}"]
  },
  skipFormatting
);
