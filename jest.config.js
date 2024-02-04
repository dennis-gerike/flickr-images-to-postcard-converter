/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: [
        '**/functionality-tests/**/*.ts'
    ],
    collectCoverage: true,
    collectCoverageFrom: ['lib/**/*.ts'],
    coverageDirectory: 'test-reports/coverage',
    coverageReporters: ['lcov', 'text-summary']
}
