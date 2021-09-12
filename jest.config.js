module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/no-babel',
  clearMocks: true,
  coverageDirectory: 'coverage',
  transformIgnorePatterns: ['/node_modules/'],
  moduleFileExtensions: [
    'js',
    'json',
    'vue',
  ],
  transform: {
    '.*\\.(vue)$': 'vue-jest',
    '.*\\.(js)$': 'babel-jest',
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
}
