import {JimpClient} from "../../../lib/jimp/JimpClient"
import {getFixturesFolderPath} from "../_helper/getFixturesFolderPath"

test('loading an invalid image file from disk should fail', async () => {
    const sourcePhotoPath = `${getFixturesFolderPath()}/invalidFile.jpg`
    const jimpClient = new JimpClient()

    await expect(
        jimpClient.setPhoto(sourcePhotoPath))
        .rejects
        .toThrow(Error)
})
