import {JimpClient} from "../../../lib/jimp/JimpClient"
import fs from "fs"
import assert from "assert"
import {determineProcessedFolderPath} from "../../../lib/converter/determineProcessedFolderPath"
import {EnvironmentVariables} from "../../../lib/converter/types/EnvironmentVariables"

/**
 * @group integration
 */
test('the processed image should be saved in the default folder when the user did not specify a custom one', async () => {
    delete process.env[EnvironmentVariables.PROCESSED_PATH]

    const randomNumber = Math.floor(Math.random() * 10000)
    const targetPath = `${determineProcessedFolderPath()}/${randomNumber}`
    const targetFile = 'dummy.jpg'

    const jimpClient = new JimpClient()
    await jimpClient.saveProcessedImage(targetPath, targetFile)

    const fullPath = `${targetPath}/${targetFile}`
    const fileExists = fs.existsSync(fullPath)
    assert(fileExists, `File "${fullPath}" not found`)
})
