import {Then} from "@cucumber/cucumber"
import sizeOf from "image-size"
import assert from "assert"
import {determineProcessedFolderPath} from "../../../lib/converter/determineProcessedFolderPath"
import {determinePhotoId} from "../../../lib/converter/determinePhotoId"
import {assertAspectRatio} from "../_helper/assertAspectRatio"

Then('the converted image should have the default aspect ratio', function () {
    const dimensions = sizeOf(`${determineProcessedFolderPath()}/${determinePhotoId()}.jpg`)
    if (dimensions.width && dimensions.height) {
        const expectedAspectRatio = 1
        const actualAspectRatio = dimensions.width / dimensions.height
        const epsilon = 0.01

        assertAspectRatio(expectedAspectRatio, actualAspectRatio, epsilon)

        return
    }

    assert(false, "Something went wrong")
})
