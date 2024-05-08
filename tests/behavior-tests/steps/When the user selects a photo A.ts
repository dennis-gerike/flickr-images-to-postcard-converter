import {When} from "@cucumber/cucumber"
import {getFixturesFolderPath} from "../_helper/getFixturesFolderPath"
import {EnvironmentVariables} from "../../EnvironmentVariables"

When('the user selects a photo A', function () {
    const fixture = require(`${getFixturesFolderPath()}/photo-A`)
    process.env[EnvironmentVariables.SOURCE_TYPE] = 'flickr-photo'
    process.env[EnvironmentVariables.MEDIA_ID] = fixture.id
})
