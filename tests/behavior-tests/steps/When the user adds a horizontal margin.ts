import {When} from "@cucumber/cucumber"

When('the user adds a horizontal margin', function () {
    process.env.MARGIN_HORIZONTAL = "10"
})
