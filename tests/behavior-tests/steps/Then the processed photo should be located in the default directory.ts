import {Then} from "@cucumber/cucumber"
import fs from "fs"
import assert from "assert"
import {EnvironmentVariables} from "../../../lib/converter/types/EnvironmentVariables"

Then('the processed photo should be located in the default directory', function () {
    const fullPath = `${__dirname}/../../../data/processed/${process.env[EnvironmentVariables.MEDIA_ID]}/${process.env[EnvironmentVariables.MEDIA_ID]}.jpg`
    const fileExists = fs.existsSync(fullPath)
    assert(fileExists, `File "${fullPath}" not found`)
})
