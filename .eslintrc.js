module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  extends: [
    'plugin:@typescript-eslint/recommended'
  ],
  rules: {
    'prefer-arrow-callback': 'warn',
    'arrow-parens': 'error',
    'max-len': 'error',
    'semi': 'warn',
    'no-new-wrappers': 'error',
    'indent': ["error", 2],
  }
};
