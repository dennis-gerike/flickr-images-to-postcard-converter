import {When} from "@cucumber/cucumber"
import {getFixturesFolderPath} from "../_helper/getFixturesFolderPath"
import {EnvironmentVariables} from "../../../lib/converter/types/EnvironmentVariables"
import {Album} from "../../_fixtures/types/Album"

When('the user selects a photo album B', function () {
    const album: Album = require(`${getFixturesFolderPath()}/album-B`)
    process.env[EnvironmentVariables.SOURCE_TYPE] = 'flickr-album'
    process.env[EnvironmentVariables.MEDIA_ID] = album.id
})
