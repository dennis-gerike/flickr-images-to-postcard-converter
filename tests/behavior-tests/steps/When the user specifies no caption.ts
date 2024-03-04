import {When} from "@cucumber/cucumber"

When('the user specifies no caption', function () {
    delete process.env.CUSTOM_TEXT
})
