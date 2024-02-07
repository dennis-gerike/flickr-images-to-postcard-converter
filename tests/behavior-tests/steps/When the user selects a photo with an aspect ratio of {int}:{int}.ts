import {When} from "@cucumber/cucumber"
import {getFixturesFolderPath} from "../_helper/getFixturesFolderPath"

When('the user selects a photo with an aspect ratio of {int}:{int}', function (x: number, y: number) {
    const fixture = require(`${getFixturesFolderPath()}/${x}by${y}`)
    process.env.FLICKR_IMAGE_ID = fixture.id
})
