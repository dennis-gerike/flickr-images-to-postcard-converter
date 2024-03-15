import fs from "fs"
import assert from "assert"
import {JimpClient} from "../../../lib/jimp/JimpClient"
import {EnvironmentVariables} from "../../../lib/converter/types/EnvironmentVariables"
import {getProcessedFolderPath as getAppProcessedFolderPath} from "../../../lib/converter/getProcessedFolderPath"
import {getProcessedFolderPath as getTestsProcessedFolderPath} from "../_helper/getProcessedFolderPath"

describe('when a custom directory was specified, then this should be used to save the processed images', () => {
    test('verifying the calculated path', async () => {
        const randomNumber = Math.floor(Math.random() * 10000)
        const expectedPath = `${getTestsProcessedFolderPath()}/${randomNumber}`
        process.env[EnvironmentVariables.PROCESSED_PATH] = expectedPath

        const actualPath = getAppProcessedFolderPath()
        assert.equal(actualPath, expectedPath)
    })

    test('verifying the location of the generated image', async () => {
        const randomNumber = Math.floor(Math.random() * 10000)
        const targetPath = `${getTestsProcessedFolderPath()}/${randomNumber}`
        const targetFile = 'dummy.jpg'

        const jimpClient = new JimpClient()
        await jimpClient.saveProcessedImage(targetPath, targetFile)

        const expectedPath = `${targetPath}/${targetFile}`
        const fileExists = fs.existsSync(expectedPath)
        assert(fileExists, `File "${expectedPath}" not found`)
    })
})
