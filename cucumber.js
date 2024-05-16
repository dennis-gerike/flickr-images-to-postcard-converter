module.exports = {
    default: {
        paths: ['specification/**/*.feature'],
        require: ['tests/behavior-tests/**/*.ts'],
        requireModule: ['ts-node/register'],
        format: [
            'html:test-reports/cucumber-report.html',
            'json:test-reports/cucumber-report.json',
            'junit:test-reports/cucumber-report.xml',
            'usage:test-reports/usage.txt',
        ],
        tags: 'not @ignore'
    }
}
