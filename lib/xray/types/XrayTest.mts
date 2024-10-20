import {IssueLink} from "./IssueLink.mjs"

export type XrayTest = {
    scenarioType: 'scenario' | 'scenario_outline'
    gherkin: string
    jira: {
        key: string
        summary: string
        issuelinks: [IssueLink]
    }
}
