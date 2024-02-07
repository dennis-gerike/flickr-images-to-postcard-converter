import {Then} from "@cucumber/cucumber"
import fs from "fs"
import assert from "assert"

Then('the downloaded photo should be located in the specified directory', function () {
    const fullPath = `${process.env.DOWNLOAD_PATH}/${process.env.FLICKR_IMAGE_ID}.jpg`
    const fileExists = fs.existsSync(fullPath)
    assert(fileExists, `File "${fullPath}" not found`)
})
