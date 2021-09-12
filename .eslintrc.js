module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    'prettier',
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    semi: 'off'
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
        '@vue/prettier'
      ],
      plugins: [
        'vue'
      ]
    }
  ]
};
