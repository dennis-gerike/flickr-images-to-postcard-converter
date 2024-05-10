import {JimpClient} from "../../../lib/jimp/JimpClient"
import {getCustomProcessedFolderPath} from "../_helper/getCustomProcessedFolderPath"
import {assertAspectRatio} from "../_helper/assertAspectRatio"
import sizeOf from "image-size"
import assert from "assert"

/**
 * @group integration
 */
describe('Aspect Ratio', () => {
    describe.each([
        3 / 2,
        1,
        16 / 9,
    ])('Image processing with valid values', (aspectRatio: number) => {
        test(`The final image should have an aspect ratio of ${aspectRatio}`, async () => {
            // create image
            const jimpClient = new JimpClient()
            jimpClient.setAspectRatio(aspectRatio)
            await jimpClient.saveProcessedImage(getCustomProcessedFolderPath(), `aspect_ratio_${aspectRatio}.jpg`)

            // fetch image dimensions
            const dimensions = sizeOf(`${getCustomProcessedFolderPath()}/aspect_ratio_${aspectRatio}.jpg`)
            const width = dimensions.width
            const height = dimensions.height

            // check aspect ratio
            if (!width || !height) {
                assert(false, "Something went wrong")
            }
            assertAspectRatio(width, height, aspectRatio)
        })
    })
})
