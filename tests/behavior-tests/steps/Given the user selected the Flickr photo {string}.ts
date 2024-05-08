import {Given} from "@cucumber/cucumber"
import {EnvironmentVariables} from "../../EnvironmentVariables"

Given('the user selected the Flickr photo {string}', function (id: string) {
    process.env[EnvironmentVariables.SOURCE_TYPE] = 'flickr-photo'
    process.env[EnvironmentVariables.MEDIA_ID] = id
})
