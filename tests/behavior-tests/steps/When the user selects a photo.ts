import {When} from "@cucumber/cucumber"
import {getFixturesFolderPath} from "../_helper/getFixturesFolderPath"

When('the user selects a Flickr photo', function () {
    const fixture = require(`${getFixturesFolderPath()}/21by9`)
    process.env.FLICKR_IMAGE_ID = fixture.id
})
