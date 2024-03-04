import {When} from "@cucumber/cucumber"
import {getFixturesFolderPath} from "../_helper/getFixturesFolderPath"
import {EnvironmentVariables} from "../../../lib/converter/types/EnvironmentVariables"

When('the user selects a photo with an aspect ratio of {int}:{int}', function (x: number, y: number) {
    const fixture = require(`${getFixturesFolderPath()}/${x}by${y}`)
    process.env[EnvironmentVariables.FLICKR_IMAGE_ID] = fixture.id
})
