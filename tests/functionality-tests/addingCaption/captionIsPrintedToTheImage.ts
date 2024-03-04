import {JimpClient} from "../../../lib/jimp/JimpClient"
import {getProcessedFolderPath} from "../_helper/getProcessedFolderPath"
import {getFixturesFolderPath} from "../_helper/getFixturesFolderPath"
import {getFailuresFolderPath} from "../_helper/getFailuresFolderPath"
import {assertImagesAreTheSame} from "../_helper/assertImagesAreTheSame"

/**
 * @group integration
 */
test("the specified caption should be printed onto the final image", async () => {
    // selecting a fixture as input image
    const source = `${getFixturesFolderPath()}/1by1`
    const sourcePhotoPath = `${source}_medium.jpg`
    const photoId = require(`${source}.json`).id

    // adding a caption and producing the final image
    const jimpClient = new JimpClient()
    await jimpClient.setPhoto(sourcePhotoPath)
    await jimpClient.setCaption({
        relativeHeight: 5,
        text: 'This is a test'
    })
    await jimpClient.saveProcessedImage(getProcessedFolderPath(), `${photoId}.jpg`)

    // comparing the processed image with the reference image
    const referenceImagePath = `${getFixturesFolderPath()}/reference-images/${photoId}.jpg`
    const processedImagePath = `${getProcessedFolderPath()}/${photoId}.jpg`
    const diffImagePath = `${getFailuresFolderPath()}/${photoId}_diff.png`
    await assertImagesAreTheSame(processedImagePath, referenceImagePath, diffImagePath)
}, 10000)
