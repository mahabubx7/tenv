/* eslint-env node */
module.exports = {
  env: {
    node: true,
    es6: true,
  },
  root: true,
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    'no-useless-escape': 'off',
  },
};
