import {When} from "@cucumber/cucumber"
import {EnvironmentVariables} from "../../EnvironmentVariables"

When('the user adds a horizontal margin', function () {
    process.env[EnvironmentVariables.MARGIN_HORIZONTAL] = "10"
})
