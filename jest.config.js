/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    projects: [
        {
            displayName: 'unit',
            testMatch: [
                '**/functionality-tests/**/*.ts',
            ],
            preset: 'ts-jest',
            testEnvironment: 'node',
            testPathIgnorePatterns: [
                '_helper',
                '_data'
            ],
        },
        {
            displayName: 'e2e',
            testMatch: [
                '**/end-2-end-tests/**/*.ts'
            ],
            preset: 'ts-jest',
            testEnvironment: 'node',
        },
    ],
    reporters: [
        'default',
        ['jest-junit', {
            "outputDirectory": "test-reports",
            "classNameTemplate": "{classname}",
            "titleTemplate": "{title}",
            "ancestorSeparator": " » "
        }],
        'github-actions'
    ],
    coverageReporters: [
        'lcov',
        'text-summary'
    ],
    collectCoverageFrom: ['lib/**/*.ts'],
    coverageDirectory: 'test-reports/coverage',
    coveragePathIgnorePatterns: [
        '_helper',
        '_data',
    ],
}
