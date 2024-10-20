import fs from "fs"
import {RenderedGherkin} from "./types/RenderedGherkin.mjs"

export class GherkinFeatureFiles {
    /**
     * Writing all Gherkin Features to disk, in the given target folder, as `*.feature` files.
     */
    static save(renderedGherkins: RenderedGherkin[], target: string) {
        renderedGherkins.forEach(renderedGherkin => {
            fs.writeFileSync(`${target}/${renderedGherkin.reference.scenario.id}.feature`, renderedGherkin.rendered)
        })
    }
}
