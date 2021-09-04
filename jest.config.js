module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  modulePathIgnorePatterns: [
    "<rootDir>/dist/"
  ],
  moduleNameMapper: {
    'slider(.*)': '<rootDir>/src/slider/$1',
  },
  setupFiles: ['jest-canvas-mock']
};

