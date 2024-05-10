import {JimpClient} from "../../../lib/jimp/JimpClient"
import {getCustomProcessedFolderPath} from "../_helper/getCustomProcessedFolderPath"
import {getFixturesFolderPath} from "../_helper/getFixturesFolderPath"
import {getFailuresFolderPath} from "../_helper/getFailuresFolderPath"
import {assertImagesAreTheSame} from "../_helper/assertImagesAreTheSame"
import {createWorker} from "tesseract.js"
import assert from "assert"

/**
 * @group integration
 */
describe('Caption', () => {
    describe('Image processing with valid values', () => {
        test('When no caption is specified then no caption segment should be rendered', async () => {
            const noCaption = ""

            // selecting a fixture as input image
            const source = `${getFixturesFolderPath()}/1by1`
            const sourcePhotoPath = `${source}_medium.jpg`
            const photoId = require(`${source}.json`).id

            // adding the empty caption and producing the final image
            const jimpClient = new JimpClient()
            await jimpClient.setPhoto(sourcePhotoPath)
            jimpClient.setCaption({
                relativeHeight: 42, // provoking the system to render the caption anyway (but should not happen)
                text: noCaption
            })
            await jimpClient.saveProcessedImage(getCustomProcessedFolderPath(), `${photoId}.jpg`)

            // comparing the processed image with the reference image
            const referenceImagePath = `${getFixturesFolderPath()}/reference-images/${photoId}-no-caption.jpg`
            const processedImagePath = `${getCustomProcessedFolderPath()}/${photoId}.jpg`
            const diffImagePath = `${getFailuresFolderPath()}/${photoId}_diff.png`

            await assertImagesAreTheSame(processedImagePath, referenceImagePath, diffImagePath)
        }, 60000)

        test("The caption should be printed onto the final image (via reference image)", async () => {
            // selecting a fixture as input image
            const source = `${getFixturesFolderPath()}/1by1`
            const sourcePhotoPath = `${source}_medium.jpg`
            const photoId = require(`${source}.json`).id

            // adding a caption and producing the final image
            const jimpClient = new JimpClient()
            await jimpClient.setPhoto(sourcePhotoPath)
            jimpClient.setCaption({
                relativeHeight: 5,
                text: 'This is a test'
            })
            await jimpClient.saveProcessedImage(getCustomProcessedFolderPath(), `${photoId}.jpg`)

            // comparing the processed image with the reference image
            const referenceImagePath = `${getFixturesFolderPath()}/reference-images/${photoId}.jpg`
            const processedImagePath = `${getCustomProcessedFolderPath()}/${photoId}.jpg`
            const diffImagePath = `${getFailuresFolderPath()}/${photoId}_diff.png`

            await assertImagesAreTheSame(processedImagePath, referenceImagePath, diffImagePath)
        }, 60000)

        test("The caption should be printed onto the final image (via OCR)", async () => {
            // selecting a fixture as input image
            const source = `${getFixturesFolderPath()}/16by9`
            const sourcePhotoPath = `${source}_medium.jpg`
            const photoId = require(`${source}.json`).id

            // adding a caption and producing the final image
            const caption = 'This caption should be displayed on the photo'
            const jimpClient = new JimpClient()
            await jimpClient.setPhoto(sourcePhotoPath)
            jimpClient.setCaption({
                relativeHeight: 5,
                text: caption
            })
            await jimpClient.saveProcessedImage(getCustomProcessedFolderPath(), `${photoId}.jpg`)

            // searching for the text on the processed image
            const worker = await createWorker()
            const {data: {lines}} = await worker.recognize(`${getCustomProcessedFolderPath()}/${photoId}.jpg`)
            let match = false
            lines.forEach(line => {
                if (line.confidence > 90 && line.text.includes(caption)) {
                    match = true
                }
            })
            await worker.terminate()

            assert.ok(match, `Caption "${caption}" not found in image.`)
        }, 60000)
    })
})
