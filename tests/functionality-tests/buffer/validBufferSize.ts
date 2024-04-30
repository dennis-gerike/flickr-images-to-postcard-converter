import {JimpClient} from "../../../lib/jimp/JimpClient"
import {getFixturesFolderPath} from "../_helper/getFixturesFolderPath"
import {getProcessedFolderPath} from "../_helper/getProcessedFolderPath"
import {getFailuresFolderPath} from "../_helper/getFailuresFolderPath"
import {assertImagesAreTheSame} from "../_helper/assertImagesAreTheSame"

test('configuring a valid buffer size should lead to an image with a buffer between photo and caption', async () => {
    const bufferSize = 10

    // selecting a fixture as input image
    const source = `${getFixturesFolderPath()}/1by1`
    const sourcePhotoPath = `${source}_medium.jpg`
    const photoId = require(`${source}.json`).id

    // adding caption and buffer, then producing the final image
    const jimpClient = new JimpClient()
    await jimpClient.setPhoto(sourcePhotoPath)
    jimpClient.setCaption({
        relativeVerticalBuffer: bufferSize,
        relativeHeight: 5,
        text: "dummy text"
    })
    await jimpClient.saveProcessedImage(getProcessedFolderPath(), `${photoId}.jpg`)

    // comparing the processed image with the reference image
    const referenceImagePath = `${getFixturesFolderPath()}/reference-images/${photoId}-with-buffer.jpg`
    const processedImagePath = `${getProcessedFolderPath()}/${photoId}.jpg`
    const diffImagePath = `${getFailuresFolderPath()}/${photoId}_diff.png`
    await assertImagesAreTheSame(processedImagePath, referenceImagePath, diffImagePath)
}, 60000)
