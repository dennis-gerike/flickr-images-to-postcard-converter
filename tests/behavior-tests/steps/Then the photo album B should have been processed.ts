import {Then} from "@cucumber/cucumber"
import {getFixturesFolderPath} from "../_helper/getFixturesFolderPath"
import {Album} from "../../_fixtures/types/Album"
import fs from "fs"
import assert from "assert"

Then('the photo album B should have been processed', function () {
    const album: Album = require(`${getFixturesFolderPath()}/album-B`)

    album.photos.forEach(photo => {
        const fullPath = `${__dirname}/../../../data/processed/${album.id}/${photo.id}.jpg`
        const fileExists = fs.existsSync(fullPath)
        assert(fileExists, `File "${fullPath}" not found`)
    })
})
