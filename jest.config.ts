import type { Config } from "jest";

const config: Config = {
  verbose: true,
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  testMatch: ["**/tests/**/*.spec.ts"],
  coverageDirectory: "coverage",
  collectCoverageFrom: ["src/**/*.ts"],
};

export default config;
