module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    "\\.spec.ts$": ['ts-jest', {
      tsConfig: 'tsconfig.json',
      isolatedModules: true,
    },],
  },
  "collectCoverageFrom": [
    "src/**/*.ts",
    "!**/node_modules/**",
    "!**/lib/**"
  ],
};
