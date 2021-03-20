import type {Config} from '@jest/types';

const config: Config.InitialOptions = {
  verbose: true,
  testRegex: "/__tests__/.*[test|spec].(ts|tsx|js)$",
  transform: {
    ".(ts|tsx)": "ts-jest"
  },
  moduleFileExtensions: ["ts", "js"],
  setupFilesAfterEnv: ['./jest.setup.ts'],
};
export default config;
