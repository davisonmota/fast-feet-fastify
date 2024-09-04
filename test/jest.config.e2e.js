/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-require-imports */
const { resolve } = require('path')
const root = resolve(__dirname, '..')
const rootConfig = require(`${root}/jest.config.js`)

module.exports = {
  ...rootConfig,
  rootDir: root,
  displayName: 'E2E-tests',
  testMatch: ['<rootDir>/src/__test__/e2e/**/*.spec-e2e.ts'],
  setupFiles: ['<rootDir>/test/jest.setup.ts'],
}
