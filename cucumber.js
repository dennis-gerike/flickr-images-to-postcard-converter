module.exports = {
    default: {
        paths: ['specification/**/*.feature'],
        require: ['tests/**/*.ts'],
        requireModule: ['ts-node/register'],
        format: [
            'html:test-reports/cucumber-report.html',
            'json:test-reports/cucumber-report.json',
            'usage:test-reports/usage.txt',
        ],
    }
}
