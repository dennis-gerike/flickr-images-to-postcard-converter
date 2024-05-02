import {JimpClient} from "../../../lib/jimp/JimpClient"
import {getFixturesFolderPath} from "../_helper/getFixturesFolderPath"
import {getCustomProcessedFolderPath} from "../_helper/getCustomProcessedFolderPath"
import {getFailuresFolderPath} from "../_helper/getFailuresFolderPath"
import {assertImagesAreTheSame} from "../_helper/assertImagesAreTheSame"

test('when no caption is specified then no caption segment should be rendered', async () => {
    const noCaption = ""

    // selecting a fixture as input image
    const source = `${getFixturesFolderPath()}/1by1`
    const sourcePhotoPath = `${source}_medium.jpg`
    const photoId = require(`${source}.json`).id

    // adding the empty caption and producing the final image
    const jimpClient = new JimpClient()
    await jimpClient.setPhoto(sourcePhotoPath)
    jimpClient.setCaption({
        relativeHeight: 42, // provoking the system to render the caption anyway (should not happen)
        text: noCaption
    })
    await jimpClient.saveProcessedImage(getCustomProcessedFolderPath(), `${photoId}.jpg`)

    // comparing the processed image with the reference image
    const referenceImagePath = `${getFixturesFolderPath()}/reference-images/${photoId}-no-caption.jpg`
    const processedImagePath = `${getCustomProcessedFolderPath()}/${photoId}.jpg`
    const diffImagePath = `${getFailuresFolderPath()}/${photoId}_diff.png`
    await assertImagesAreTheSame(processedImagePath, referenceImagePath, diffImagePath)
}, 60000)
