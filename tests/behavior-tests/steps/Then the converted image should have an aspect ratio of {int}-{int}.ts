import {Then} from "@cucumber/cucumber"
import sizeOf from "image-size"
import assert from "assert"
import {determineProcessedFolderPath} from "../../../lib/converter/determineProcessedFolderPath"
import {determineMediaId} from "../../../lib/converter/determineMediaId"
import {assertAspectRatio} from "../_helper/assertAspectRatio"

Then('the converted image should have an aspect ratio of {int}:{int}', function (x: number, y: number) {
    const mediaId = determineMediaId()
    const dimensions = sizeOf(`${determineProcessedFolderPath(mediaId)}/${mediaId}.jpg`)

    if (dimensions.width && dimensions.height) {
        const expectedAspectRatio = x / y
        const actualAspectRatio = dimensions.width / dimensions.height
        const epsilon = 0.01

        assertAspectRatio(expectedAspectRatio, actualAspectRatio, epsilon)

        return
    }

    assert(false, "Something went wrong")
})
