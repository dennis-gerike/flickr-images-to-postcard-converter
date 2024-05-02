import fs from "fs"
import assert from "assert"
import {JimpClient} from "../../../lib/jimp/JimpClient"
import {getCustomProcessedFolderPath} from "../_helper/getCustomProcessedFolderPath"

/**
 * @group integration
 */
test('the processed image should be saved in the user-specified folder', async () => {
    const randomNumber = Math.floor(Math.random() * 10000)
    const targetPath = `${getCustomProcessedFolderPath()}/${randomNumber}`
    const targetFile = 'dummy.jpg'

    const jimpClient = new JimpClient()
    await jimpClient.saveProcessedImage(targetPath, targetFile)

    const expectedPath = `${targetPath}/${targetFile}`
    const fileExists = fs.existsSync(expectedPath)
    assert(fileExists, `File "${expectedPath}" not found`)
})
