/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

/** @type {import('jest').Config} */
const config = {
  "moduleFileExtensions": ["js", "json", "ts"],
  "roots": ["src"],
  "testRegex": ".*\\.spec\\.ts$",
  "transform": { "^.+\\.(t|j)s$": "ts-jest" },
  "collectCoverageFrom": ["src/**/*.{js,jsx,ts,tsx}"],
  "coverageDirectory": "../coverage",
  "coverageReporters": ["lcov", "text"],
  "testEnvironment": "node",
  "setupFilesAfterEnv": ['<rootDir>/src/singleton.ts']
};

module.exports = config;
