import {JimpClient} from "../../../lib/jimp/JimpClient"
import {getFixturesFolderPath} from "../_helper/getFixturesFolderPath"
import {getCustomProcessedFolderPath} from "../_helper/getCustomProcessedFolderPath"
import fs from "fs"
import assert from "assert"
import {ImageInformation} from "../../../lib/flickr/types/internal/ImageInformation"
import sizeOf from "image-size"

/**
 * @group integration
 */
describe('Photo Processing', () => {
    test('Loading an invalid image file from disk should fail', async () => {
        const sourcePhotoPath = `${getFixturesFolderPath()}/invalidFile.jpg`
        const jimpClient = new JimpClient()

        await expect(
            jimpClient.setPhoto(sourcePhotoPath))
            .rejects
            .toThrow(Error)
    })

    test('Loading a valid image file from disk should not fail', async () => {
        const sourcePhotoPath = `${getFixturesFolderPath()}/21by9_medium.jpg`
        const jimpClient = new JimpClient()

        await expect(
            jimpClient.setPhoto(sourcePhotoPath))
            .resolves
            .not.toThrow(Error)
    })

    test('A valid image file should be converted', async () => {
        const sourcePhotoPath = `${getFixturesFolderPath()}/21by9_medium.jpg`
        const randomNumber = Math.floor(Math.random() * 10000)
        const targetPath = `${getCustomProcessedFolderPath()}/${randomNumber}`
        const targetFile = 'dummy.jpg'

        const jimpClient = new JimpClient()
        await jimpClient.setPhoto(sourcePhotoPath)

        await expect(jimpClient.saveProcessedImage(targetPath, targetFile))
            .resolves
            .not.toThrow(Error)

        const fullPath = `${targetPath}/${targetFile}`
        const fileExists = fs.existsSync(fullPath)

        assert(fileExists, `File "${fullPath}" not found`)
    }, 60000)

    test('The final image should have the correct dimensions', async () => {
        const sourceImageLocation = `${getFixturesFolderPath()}/16by10_medium.jpg`
        const sourceImageInformation: ImageInformation = require(`${getFixturesFolderPath()}/16by10.json`)
        const randomNumber = Math.floor(Math.random() * 10000)

        // create image
        const jimpClient = new JimpClient()
        await jimpClient.setPhoto(sourceImageLocation)
        jimpClient.setAspectRatio(1.6)
        await jimpClient.saveProcessedImage(getCustomProcessedFolderPath(), `${randomNumber}/finalImage.jpg`)

        // verify dimensions
        const dimensions = sizeOf(`${getCustomProcessedFolderPath()}/${randomNumber}/finalImage.jpg`)
        const width = dimensions.width
        const height = dimensions.height
        expect(width).toEqual(sourceImageInformation.width)
        expect(height).toEqual(sourceImageInformation.height)
    }, 60000)
})
