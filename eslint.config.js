import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-plugin-prettier';

// typescript-eslint 권장 설정 직접 가져오기
const tsRecommended = {
  linterOptions: {
    reportUnusedDisableDirectives: true,
  },
  files: ['**/*.{ts,tsx}'],
  languageOptions: {
    parser: tseslint.parser,
    parserOptions: {
      sourceType: 'module',
      projectService: true,
    },
  },
  plugins: {
    '@typescript-eslint': tseslint.plugin,
  },
  rules: {
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unused-vars': 'warn',
  },
};

// prettier 설정
const prettierConfig = {
  files: ['**/*.{js,jsx,ts,tsx}'],
  plugins: {
    prettier: prettier,
  },
  rules: {
    'prettier/prettier': 'error',
  },
};

export default [
  { ignores: ['dist'] },
  js.configs.recommended,
  tsRecommended,
  prettierConfig,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
];
