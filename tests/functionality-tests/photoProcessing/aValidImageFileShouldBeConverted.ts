import {JimpClient} from "../../../lib/jimp/JimpClient"
import {getFixturesFolderPath} from "../_helper/getFixturesFolderPath"
import {getProcessedFolderPath} from "../_helper/getProcessedFolderPath"
import fs from "fs"
import assert from "assert"

test('a valid image file should be converted', async () => {
    const sourcePhotoPath = `${getFixturesFolderPath()}/21by9_medium.jpg`
    const randomNumber = Math.floor(Math.random() * 10000)
    const targetPath = `${getProcessedFolderPath()}/${randomNumber}`
    const targetFile = 'dummy.jpg'

    const jimpClient = new JimpClient()
    await jimpClient.setPhoto(sourcePhotoPath)

    await expect(jimpClient.saveProcessedImage(targetPath, targetFile))
        .resolves
        .not.toThrow(Error)

    const fullPath = `${targetPath}/${targetFile}`
    const fileExists = fs.existsSync(fullPath)
    assert(fileExists, `File "${fullPath}" not found`)
}, 10000)
