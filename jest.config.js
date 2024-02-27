/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: [
        '**/functionality-tests/**/*.ts'
    ],
    testPathIgnorePatterns: [
        '_helper',
        '_data'
    ],
    reporters: [
        'default',
        'github-actions'
    ],
    collectCoverageFrom: ['lib/**/*.ts'],
    coveragePathIgnorePatterns: [
        '_helper',
        '_data'
    ],
    coverageDirectory: 'test-reports/coverage',
    coverageReporters: [
        'lcov',
        'text-summary'
    ]
}
