import {Given} from "@cucumber/cucumber"
import {EnvironmentVariables} from "../../../lib/converter/types/EnvironmentVariables"

Given('the user selected the Flickr photo {string}', function (id: string) {
    process.env[EnvironmentVariables.FLICKR_IMAGE_ID] = id
})
