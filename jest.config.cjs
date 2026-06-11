/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/tests'],
  testMatch: ['**/*.spec.ts'],
  setupFiles: ['<rootDir>/tests/setup-env.ts'],
  clearMocks: true,
  collectCoverageFrom: ['src/**/*.ts', '!src/**/*.d.ts'],
  coveragePathIgnorePatterns: ['/node_modules/', '/dist/']
};
