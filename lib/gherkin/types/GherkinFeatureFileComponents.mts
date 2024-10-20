export type GherkinFeatureFileComponents = {
    scenario: {
        id: string
        title: string
        type: 'Scenario' | 'Scenario Outline'
        gherkin: string
    }
    requirement: {
        id: string
        title: string
        description: string
    }
}
