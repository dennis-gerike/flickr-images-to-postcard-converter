import {JimpClient} from "../../../lib/jimp/JimpClient"
import {getFixturesFolderPath} from "../_helper/getFixturesFolderPath"
import {getProcessedFolderPath} from "../_helper/getProcessedFolderPath"
import {ImageInformation} from "../../../lib/flickr/types/internal/ImageInformation"
import sizeOf from "image-size"

/**
 * @group integration
 */
test('the final image should have the correct dimensions', async () => {
    const sourceImageLocation = `${getFixturesFolderPath()}/16by10_medium.jpg`
    const sourceImageInformation: ImageInformation = require(`${getFixturesFolderPath()}/16by10.json`)
    const randomNumber = Math.floor(Math.random() * 10000)

    // create image
    const jimpClient = new JimpClient()
    await jimpClient.setPhoto(sourceImageLocation)
    jimpClient.setAspectRatio(1.6)
    await jimpClient.saveProcessedImage(getProcessedFolderPath(), `${randomNumber}/finalImage.jpg`)

    // verify dimensions
    const dimensions = sizeOf(`${getProcessedFolderPath()}/${randomNumber}/finalImage.jpg`)
    const width = dimensions.width
    const height = dimensions.height
    expect(width).toEqual(sourceImageInformation.width)
    expect(height).toEqual(sourceImageInformation.height)
}, 10000)
