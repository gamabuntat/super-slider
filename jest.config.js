module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  moduleNameMapper: {
    '.*sass$': 'identity-obj-proxy',
    'src(.+)': '<rootDir>/src$1',
    'slider(.+)': '<rootDir>/src/slider$1',
    'helpers(.+)': '<rootDir>/src/helpers$1',
  },
  setupFiles: ['jest-canvas-mock'],
  setupFilesAfterEnv: ['jest-extended/all']
};
