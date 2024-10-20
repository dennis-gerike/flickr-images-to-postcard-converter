import {RawGherkinComponents} from "./types/RawGherkinComponents.mjs"

export class GherkinRenderer {
    /**
     * Converting all the given tests into "Feature" descriptions, which can later be saved as regular Gherkin `*.feature` files.
     */
    static renderAll(rawGherkins: RawGherkinComponents[]) {
        let renderedGherkinFiles: string[] = []

        rawGherkins.forEach(rawGherkin => {
            renderedGherkinFiles.push(GherkinRenderer.renderOne(rawGherkin))
        })

        return renderedGherkinFiles
    }

    /**
     * Generating a valid "Feature" description from the given information about the scenario and the requirement it is based on.
     */
    static renderOne(rawGherkin: RawGherkinComponents) {
        return `
            @REQ_${rawGherkin.requirement.id}
            Feature: ${rawGherkin.requirement.title}
                        
                @TEST_${rawGherkin.scenario.id}
                ${rawGherkin.scenario.type}: ${rawGherkin.scenario.id} » ${rawGherkin.scenario.title}
                    ${rawGherkin.scenario.gherkin}
            `;
    }
}
