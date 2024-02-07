import {Given} from "@cucumber/cucumber"

Given('the user selected a Flickr photo', function () {
    process.env.FLICKR_IMAGE_ID = "53487076833"
})
