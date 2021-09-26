module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['fsd'],
  extends: [
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    'prefer-arrow-callback': 'warn',
    'arrow-parens': 'error',
    'max-len': 'error',
    'semi': 'warn',
    'no-new-wrappers': 'error',
    'indent': ["error", 2],
    'array-bracket-spacing': ["error", "never"],
    'object-curly-spacing': ["error", "always"],
    'fsd/hof-name-prefix': 'error',
    'fsd/no-heavy-constructor': 'error',
    'fsd/jq-cache-dom-elements': 'error',
    'fsd/jq-use-js-prefix-in-selector': 'error',
    'fsd/no-function-declaration-in-event-listener': 'error',
    'fsd/split-conditionals': 'error',
  }
};

