import {When} from "@cucumber/cucumber"
import {EnvironmentVariables} from "../../../lib/converter/types/EnvironmentVariables"

When('the user selects an invalid Flickr photo', function () {
    process.env[EnvironmentVariables.FLICKR_IMAGE_ID] = "-5"
})
