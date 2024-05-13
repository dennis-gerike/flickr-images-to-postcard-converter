import {Then} from "@cucumber/cucumber"
import {createWorker} from "tesseract.js"
import {determineMediaId} from "../../../lib/converter/determineMediaId"
import {determineProcessedFolderPath} from "../../../lib/converter/determineProcessedFolderPath"
import assert from "assert"

Then('the processed image should have a caption which contains the text {string}', {timeout: 10000}, async function (snippet: string) {
    const mediaId = determineMediaId()
    const worker = await createWorker();
    const {data: {lines}} = await worker.recognize(`${determineProcessedFolderPath(mediaId)}/${mediaId}.jpg`)

    let match = false
    lines.forEach(line => {
        if (line.confidence > 90 && line.text.includes(snippet)) {
            match = true
        }
    })
    await worker.terminate()

    assert.ok(match, `Snippet "${snippet}" not found in the image's caption.`)
})
