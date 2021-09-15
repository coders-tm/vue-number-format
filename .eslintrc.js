module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    'eslint:recommended',
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2020
  },
  ignorePatterns: ['**/tests/unit/*.spec.js'],
  rules: {
    'semi': 'off',
    'comma-dangle': ["error", "never"],
    'prefer-arrow-callback': 0,
    'consistent-return': 0,
    'prefer-destructuring': 0,
    'no-param-reassign': 0,
    'max-len': 0,
    'no-var': 0
  },
  overrides: [
    {
      files: ['**/tests/unit/*.spec.js'],
      env: {
        jest: true
      }
    },
    {
      files: ['**/*.vue'],
      extends: [
        'plugin:vue/essential',
        'eslint:recommended',
      ],
      plugins: [
        'vue'
      ]
    }
  ]
};
