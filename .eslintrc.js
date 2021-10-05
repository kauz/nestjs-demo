module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'eslint-plugin-import'],
  extends: [
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  rules: {
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/camelcase': [
      'error',
      {
        allow: ['^credentials_', '^user_', '_violation$'],
      },
    ],
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-use-before-define': ['error', { functions: false }],
    indent: ['error', 2, { SwitchCase: 1 }],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single', { avoidEscape: true }],
    semi: ['error', 'always'],
    'no-unneeded-ternary': 2,
    'no-console': 2,
    'no-trailing-spaces': 'error',
    'object-curly-spacing': ['error', 'always'],
    'key-spacing': ['error', { mode: 'strict' }],
    'keyword-spacing': 2,
    'arrow-spacing': 2,
    'space-infix-ops': 2,
    'spaced-comment': 2,
    'no-multiple-empty-lines': ['error', { max: 2 }],
    'no-var': 2,
    'one-var': ['error', 'never'],
    'prefer-const': 2,
    'import/order': [
      'warn',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          ['sibling', 'parent', 'index'],
        ],
        pathGroups: [
          {
            pattern: '@nestjs/**',
            group: 'external',
            position: 'after',
          },
          {
            pattern: '@stockx/**',
            group: 'external',
            position: 'after',
          },
          {
            pattern: '@root/**',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '@test/**',
            group: 'internal',
            position: 'before',
          },
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
        'newlines-between': 'never',
      },
    ],
  },
};
