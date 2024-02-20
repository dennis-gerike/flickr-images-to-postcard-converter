import {JimpClient} from "../../../lib/jimp/JimpClient"
import fs from "fs"
import assert from "assert"
import {getProcessedFolderPath as getDefaultProcessedFolderPath} from "../../../lib/converter/getProcessedFolderPath"

test('when no custom directory was specified, then the default one should be used to save the processed images', async () => {
    const randomNumber = Math.floor(Math.random() * 10000)
    const targetPath = `${getDefaultProcessedFolderPath()}/${randomNumber}`
    const targetFile = 'dummy.jpg'

    const jimpClient = new JimpClient()
    await jimpClient.saveProcessedImage(targetPath, targetFile)

    const fullPath = `${targetPath}/${targetFile}`
    const fileExists = fs.existsSync(fullPath)
    assert(fileExists, `File "${fullPath}" not found`)
})
