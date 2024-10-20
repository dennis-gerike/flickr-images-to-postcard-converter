import {GherkinFeatureFileComponents} from "./types/GherkinFeatureFileComponents.mjs"
import {XrayTest} from "../xray/types/XrayTest.mjs"

/**
 * Takes a response from the Xray API and extracts all the information that is needed to later-on create a valid Gherkin feature file.
 */
export class XrayGherkinExtractor {
    /**
     * Expects an array which contains the raw test case information from Jira/Xray.
     * Returns an object containing the necessary data to build a Gherkin feature file for each test.
     */
    static extract(rawTests: Array<XrayTest>) {
        let extracted: GherkinFeatureFileComponents[] = []

        rawTests.forEach(test => {
            extracted.push(XrayGherkinExtractor.extractTest(test))
        })

        return extracted
    }

    private static extractTest(test: XrayTest) {
        let extractedTest: GherkinFeatureFileComponents

        extractedTest = {
            scenario: {
                id: test.jira.key,
                type: test.scenarioType == 'scenario_outline' ? 'Scenario Outline' : 'Scenario',
                title: test.jira.summary,
                gherkin: test.gherkin
            },
            requirement: {
                id: "TODO",
                title: "TODO",
                description: "TODO"
            },
        }

        return extractedTest
    }
}
