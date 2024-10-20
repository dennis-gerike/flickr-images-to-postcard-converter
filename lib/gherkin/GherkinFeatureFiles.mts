import fs from "fs"
import filenamify from "filenamify"
import {RenderedGherkin} from "./types/RenderedGherkin.mjs"

export class GherkinFeatureFiles {
    /**
     * Writing all Gherkin Features to disk, in the given target folder, as `*.feature` files.
     */
    static save(renderedGherkins: RenderedGherkin[], targetFolder: string) {
        renderedGherkins.forEach(renderedGherkin => {
            const rawFilename = `${renderedGherkin.reference.scenario.id} » ${renderedGherkin.reference.scenario.title}`
            const sanitizedFilename = filenamify(rawFilename, {replacement: '_'});

            fs.writeFileSync(`${targetFolder}/${sanitizedFilename}.feature`, renderedGherkin.rendered)
        })
    }
}
