import {When} from "@cucumber/cucumber"

When('the user adds a text', function () {
    process.env.CUSTOM_TEXT = "TEST 123"
})
