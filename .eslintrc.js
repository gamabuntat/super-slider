module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  extends: ['airbnb-base', 'airbnb-typescript/base', 'prettier'],
  rules: {
    'class-methods-use-this': 0,
    'max-classes-per-file': 0,
    'no-param-reassign': 0,
    'no-use-before-define': ['error', { classes: false }],
    'func-names': 0,
    'no-new': 0,
    'no-use-before-define': 0,
    '@typescript-eslint/no-use-before-define': 0,
    '@typescript-eslint/lines-between-class-members': [
      'error',
      'always',
      { exceptAfterSingleLine: true },
    ],
  },
};
