import {Then} from "@cucumber/cucumber"
import fs from "fs"
import assert from "assert"

Then('the processed photo should be located in the default directory', function () {
    const fullPath = `${__dirname}/../../../data/processed/null/${process.env.FLICKR_IMAGE_ID}.jpg`
    const fileExists = fs.existsSync(fullPath)
    assert(fileExists, `File "${fullPath}" not found`)
})
