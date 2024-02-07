import {When} from "@cucumber/cucumber"

When('the user configures the aspect ratio to be 0', function () {
    process.env.ASPECT_RATIO = "0"
})
