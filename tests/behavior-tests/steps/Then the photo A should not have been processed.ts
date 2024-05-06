import {Then} from "@cucumber/cucumber"
import fs from "fs"
import assert from "assert"
import {getFixturesFolderPath} from "../_helper/getFixturesFolderPath"
import {Photo} from "../../_fixtures/types/Photo"

Then('the photo A should not have been processed', function () {
    const photo: Photo = require(`${getFixturesFolderPath()}/photo-A`)
    const fullPath = `${__dirname}/../../../data/processed/${photo.id}/${photo.id}.jpg`
    const fileExists = fs.existsSync(fullPath)

    assert(!fileExists, `Expected file "${fullPath}" not to exist`)
})
