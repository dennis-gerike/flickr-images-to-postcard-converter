export type GetAllTestsResponse = {
    scenarioType: 'scenario' | 'scenario_outline'
    gherkin: string
    jira: {
        key: string
        summary: string
    }
}
