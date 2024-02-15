import {When} from "@cucumber/cucumber"

When('the user does not specify the directory for the processed images', function () {
    delete process.env.PROCESSED_PATH
})
