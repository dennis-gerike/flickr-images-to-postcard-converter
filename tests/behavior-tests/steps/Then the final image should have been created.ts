import {Then} from "@cucumber/cucumber"
import fs from "fs"
import assert from "assert"
import {EnvironmentVariables} from "../../../lib/converter/types/EnvironmentVariables"

Then('the final image should have been created', function () {
    const fullPath = `${__dirname}/../../../data/processed/null/${process.env[EnvironmentVariables.FLICKR_IMAGE_ID]}.jpg`
    const fileExists = fs.existsSync(fullPath)
    assert(fileExists, `File "${fullPath}" not found`)
})
