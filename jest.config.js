const { defaults: tsjPreset } = require('ts-jest/presets');

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  collectCoverageFrom: ['packages/**/*.{ts,tsx}'],
  transform: {
    ...tsjPreset.transform,
    // '^.+\\.tsx?$': [
    //   'ts-jest',
    //   {
    //     isolatedModules: true,
    //     // ts-jest configuration goes here
    //   },
    // ],
  },
  setupFilesAfterEnv: ['./scripts/setup-test.ts'],
};
