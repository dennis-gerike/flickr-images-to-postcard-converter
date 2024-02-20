import fs from "fs"
import assert from "assert"
import {JimpClient} from "../../../lib/jimp/JimpClient"
import {getProcessedFolderPath} from "../_helper/getProcessedFolderPath"

test('when a custom directory was specified, then this should be used to save the processed images', async () => {
    const randomNumber = Math.floor(Math.random() * 10000)
    const targetPath = `${getProcessedFolderPath()}/${randomNumber}`
    const targetFile = 'dummy.jpg'

    const jimpClient = new JimpClient()
    await jimpClient.saveProcessedImage(targetPath, targetFile)

    const fullPath = `${targetPath}/${targetFile}`
    const fileExists = fs.existsSync(fullPath)
    assert(fileExists, `File "${fullPath}" not found`)
})
