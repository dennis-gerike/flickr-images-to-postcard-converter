import {Then} from "@cucumber/cucumber"
import fs from "fs"
import assert from "assert"
import {EnvironmentVariables} from "../../EnvironmentVariables"

Then('the processed photo should be located in the specified directory', function () {
    const mediaId = process.env[EnvironmentVariables.MEDIA_ID]
    const fullPath = `${process.env[EnvironmentVariables.PROCESSED_PATH]}/${mediaId}/${mediaId}.jpg`
    const fileExists = fs.existsSync(fullPath)

    assert(fileExists, `File "${fullPath}" not found`)
})
