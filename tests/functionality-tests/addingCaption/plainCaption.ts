import {JimpClient} from "../../../lib/jimp/JimpClient"
import {getProcessedFolderPath} from "../_helper/getProcessedFolderPath"
import {getFixturesFolderPath} from "../_helper/getFixturesFolderPath"
import {getFailuresFolderPath} from "../_helper/getFailuresFolderPath"
import {assertImagesAreTheSame} from "../_helper/assertImagesAreTheSame"
import {createWorker} from "tesseract.js"
import assert from "assert"

/**
 * @group integration
 */
test("[via reference image] the specified caption should be printed onto the final image", async () => {
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
    await jimpClient.saveProcessedImage(getProcessedFolderPath(), `${photoId}.jpg`)

    // comparing the processed image with the reference image
    const referenceImagePath = `${getFixturesFolderPath()}/reference-images/${photoId}.jpg`
    const processedImagePath = `${getProcessedFolderPath()}/${photoId}.jpg`
    const diffImagePath = `${getFailuresFolderPath()}/${photoId}_diff.png`
    await assertImagesAreTheSame(processedImagePath, referenceImagePath, diffImagePath)
}, 20000)

/**
 * @group integration
 */
test("[via OCR] the specified caption should be printed onto the final image", async () => {
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
    await jimpClient.saveProcessedImage(getProcessedFolderPath(), `${photoId}.jpg`)

    // searching for the text on the processed image
    const worker = await createWorker();
    const {data: {lines}} = await worker.recognize(`${getProcessedFolderPath()}/${photoId}.jpg`)
    let match = false
    lines.forEach(line => {
        if (line.confidence > 90 && line.text.includes(caption)) {
            match = true
        }
    })
    await worker.terminate()

    assert.ok(match, `Caption "${caption}" not found in image.`)
}, 20000)
