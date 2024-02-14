import {When} from "@cucumber/cucumber"

When('the user selects an invalid Flickr photo', function () {
    process.env.FLICKR_IMAGE_ID = "-5"
})
