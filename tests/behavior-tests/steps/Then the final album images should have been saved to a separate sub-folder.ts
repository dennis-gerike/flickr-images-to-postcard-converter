import {Then} from "@cucumber/cucumber"
import {getFixturesFolderPath} from "../_helper/getFixturesFolderPath"
import {Album} from "../../_fixtures/types/Album"
import fs from "fs"
import assert from "assert"

Then('the final album images should have been saved to a separate sub-folder', function () {
    const album: Album = require(`${getFixturesFolderPath()}/album`)
    const fullPath = `${__dirname}/../../../data/processed/${album.id}`
    const folderExists = fs.existsSync(fullPath)
    assert(folderExists, `Folder "${fullPath}" not found`)

    const filesInFolder = fs.readdirSync(fullPath)
    assert(filesInFolder.length === album.photos.length)
})
