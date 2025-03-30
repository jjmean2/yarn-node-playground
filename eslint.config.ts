import { defineConfig, globalIgnores } from 'eslint/config'
import globals from 'globals'
import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import type { ESLint, Linter } from 'eslint'
import eslintConfigPreitter from 'eslint-config-prettier/flat'

export default defineConfig([
  globalIgnores(['.yarn', '.pnp.cjs', '.pnp.loader.mjs'], 'project/yarn-generated'),
  globalIgnores(['dist'], 'project/build-artifacts'),
  {
    name: 'project/main',
    files: ['**/*.ts', '**/*.mts', '**/*.cts'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended as Linter.Config,
      eslintConfigPreitter,
    ],
    plugins: {
      '@typescript-eslint': tseslint.plugin as ESLint.Plugin,
    },
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {
      // customized rules
      '@typescript-eslint/no-unused-vars': ['error'],
    },
  },
])
