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
  rules: {
    semi: 0,
    'prefer-arrow-callback': 0,
    'consistent-return': 0,
    'prefer-destructuring': 0,
    'no-param-reassign': 0,
    'max-len': 0,
    'no-var': 0
  },
  overrides: [
    {
      files: ['**/__tests__/*.{j}s?(x)', '**/tests/unit/**/*.spec.{j}s?(x)'],
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
