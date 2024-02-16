import {When} from "@cucumber/cucumber"

When('the user adds a buffer between text and image', function () {
    process.env.TEXT_VERTICAL_BUFFER = "2.5"
})
