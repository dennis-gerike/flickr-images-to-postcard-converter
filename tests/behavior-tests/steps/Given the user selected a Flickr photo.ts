import {Given} from "@cucumber/cucumber"
import {getFixturesFolderPath} from "../_helper/getFixturesFolderPath"
import {EnvironmentVariables} from "../../../lib/converter/types/EnvironmentVariables"

Given('the user selected a Flickr photo', function () {
    const fixture = require(`${getFixturesFolderPath()}/21by9`)
    process.env[EnvironmentVariables.SOURCE_TYPE] = 'flickr-photo'
    process.env[EnvironmentVariables.MEDIA_ID] = fixture.id
})
