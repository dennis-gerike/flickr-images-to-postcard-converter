import {Then} from "@cucumber/cucumber"
import sizeOf from "image-size"
import assert from "assert"
import {getProcessedFolderPath} from "../../../lib/converter/getProcessedFolderPath"
import {getPhotoId} from "../../../lib/converter/getPhotoId"

Then('the converted image should have the default aspect ratio', function () {
    const dimensions = sizeOf(`${getProcessedFolderPath()}/${getPhotoId()}.jpg`)
    if (dimensions.width && dimensions.height) {
        const expectedAspectRatio = 1
        const actualAspectRatio = dimensions.width / dimensions.height
        const epsilon = 0.01
        assert(Math.abs(expectedAspectRatio - actualAspectRatio) < epsilon)

        return
    }

    assert(false)
})
