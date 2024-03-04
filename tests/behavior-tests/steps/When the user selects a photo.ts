import {When} from "@cucumber/cucumber"
import {getFixturesFolderPath} from "../_helper/getFixturesFolderPath"
import {EnvironmentVariables} from "../../../lib/converter/types/EnvironmentVariables"

When('the user selects a Flickr photo', function () {
    const fixture = require(`${getFixturesFolderPath()}/21by9`)
    process.env[EnvironmentVariables.FLICKR_IMAGE_ID] = fixture.id
})
