module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  modulePathIgnorePatterns: [
    "<rootDir>/dist/"
  ],
  moduleNameMapper: {
    'slider(.*)': '<rootDir>/src/slider/$1',
  },
};

