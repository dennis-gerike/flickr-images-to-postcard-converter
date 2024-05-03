import {When} from "@cucumber/cucumber"
import {EnvironmentVariables} from "../../../lib/converter/types/EnvironmentVariables"

When('the user selects an invalid Flickr photo', function () {
    process.env[EnvironmentVariables.SOURCE_TYPE] = 'flickr-photo'
    process.env[EnvironmentVariables.MEDIA_ID] = "-5"
})
