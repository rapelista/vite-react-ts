import js from '@eslint/js';
import prettier from 'eslint-config-prettier/flat';
import pluginImport from 'eslint-plugin-import';
import importZod from 'eslint-plugin-import-zod';
import pluginReact from 'eslint-plugin-react';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: { globals: globals.browser },
  },

  tseslint.configs.recommended,

  {
    extends: [
      pluginImport.flatConfigs.recommended,
      pluginImport.flatConfigs.typescript,
    ],

    settings: {
      'import/resolver': {
        typescript: true,
        node: true,
      },
    },

    rules: {
      '@typescript-eslint/no-empty-object-type': 'off',

      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],

      'import/no-named-as-default-member': 'off',

      'import/order': [
        'warn',
        {
          groups: [
            'type',
            'builtin',
            'object',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
          ],
          'newlines-between': 'always',
          pathGroups: [
            {
              group: 'external',
              pattern: '~/**',
              position: 'after',
            },
          ],
        },
      ],
    },
  },

  pluginReact.configs.flat.recommended,

  {
    settings: {
      react: {
        version: 'detect',
      },
    },
  },

  {
    rules: {
      'react/no-unescaped-entities': 'off',

      'react/react-in-jsx-scope': 'off',

      'react/jsx-curly-brace-presence': [
        'warn',
        {
          children: 'never',
          props: 'never',
        },
      ],

      'react/jsx-sort-props': [
        'warn',
        {
          callbacksLast: true,
          noSortAlphabetically: false,
          reservedFirst: true,
          shorthandFirst: true,
        },
      ],

      'react/self-closing-comp': 'warn',
    },
  },

  {
    rules: {
      'no-console': 'warn',

      'padding-line-between-statements': [
        'warn',
        {
          blankLine: 'always',
          next: 'return',
          prev: '*',
        },
        {
          blankLine: 'always',
          next: '*',
          prev: ['const', 'let', 'var'],
        },
        {
          blankLine: 'any',
          next: ['const', 'let', 'var'],
          prev: ['const', 'let', 'var'],
        },
      ],
    },
  },

  prettier,

  importZod.configs.recommended,

  globalIgnores([
    'node_modules',
    'dist',
    '**/.output/**',
    '**/.nitro/**',
    '**/.tanstack/**',
  ]),
]);
