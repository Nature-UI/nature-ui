module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverageFrom: ['__tests__/**/*.{ts,tsx}'],
  transform: { '.(ts|tsx)$': 'ts-jest/dist' },
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$'],
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  verbose: true,
};
