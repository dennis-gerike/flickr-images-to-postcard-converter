import {When} from "@cucumber/cucumber"

When('the user adds a vertical margin', function () {
    process.env.VERTICAL_MARGIN = "5"
})
