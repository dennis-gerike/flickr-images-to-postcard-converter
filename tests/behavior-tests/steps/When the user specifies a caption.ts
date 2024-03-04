import {When} from "@cucumber/cucumber"

When('the user specifies a caption', function () {
    process.env.CUSTOM_TEXT = "Nice photo"
})
