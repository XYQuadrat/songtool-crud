module.exports = {
  root: true,

  env: {
    node: true,
  },

  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'vue/require-default-prop': 'off',
    'comma-dangle': [
      'error',
      'always-multiline',
    ],
    'array-element-newline': [
      'error',
      {
        multiline: true,
        minItems: 2,
      },
    ],
    'array-bracket-newline': [
      'error',
      {
        multiline: true,
        minItems: 2,
      },
    ],
    'array-bracket-spacing': [
      'error',
      'never',
    ],
    'object-curly-newline': [
      'error',
      {
        consistent: true,
      },
    ],
    'object-curly-spacing': [
      'error',
      'always',
    ],
  },

  parserOptions: {
    parser: '@babel/eslint-parser',
  },

  plugins: ['@babel'],

  extends: [
    'plugin:vue/recommended',
    '@vue/standard',
  ],
}
