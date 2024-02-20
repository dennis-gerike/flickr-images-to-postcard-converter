import {JimpClient} from "../../../lib/jimp/JimpClient"
import {getFixturesFolderPath} from "../_helper/getFixturesFolderPath"

test('loading a valid image file from disk should not fail', async () => {
    const sourcePhotoPath = `${getFixturesFolderPath()}/21by9_medium.jpg`
    const jimpClient = new JimpClient()

    await expect(
        jimpClient.setPhoto(sourcePhotoPath))
        .resolves
        .not.toThrow(Error)
})
