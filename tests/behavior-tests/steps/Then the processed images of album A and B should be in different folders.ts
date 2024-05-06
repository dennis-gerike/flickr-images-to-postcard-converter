import {Then} from "@cucumber/cucumber"
import {getFixturesFolderPath} from "../_helper/getFixturesFolderPath"
import {Album} from "../../_fixtures/types/Album"
import fs from "fs"
import assert from "assert"

Then('the processed images of album A and B should be in different folders', function () {
    const albumA: Album = require(`${getFixturesFolderPath()}/album-A`)
    const albumB: Album = require(`${getFixturesFolderPath()}/album-B`)

    const fullPathA = `${__dirname}/../../../data/processed/${albumA.id}`
    const fullPathB = `${__dirname}/../../../data/processed/${albumB.id}`

    assert.notEqual(fullPathA, fullPathB, `Folders should not be the same`)

    const folderAExists = fs.existsSync(fullPathA)
    const folderBExists = fs.existsSync(fullPathB)

    assert(folderAExists, `Folder "${fullPathA}" not found`)
    assert(folderBExists, `Folder "${fullPathB}" not found`)

    const filesInFolderA = fs.readdirSync(fullPathA)
    const filesInFolderB = fs.readdirSync(fullPathB)

    assert.equal(filesInFolderA.length, albumA.photos.length, "File count does not match")
    assert.equal(filesInFolderB.length, albumB.photos.length, "File count does not match")
})
