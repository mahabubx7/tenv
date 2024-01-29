module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.json',
      isolatedModules: true,
    },
  },
  setupFiles: ['<rootDir>/jest.setup.ts'],
};
