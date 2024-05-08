import {When} from "@cucumber/cucumber"
import {EnvironmentVariables} from "../../EnvironmentVariables"

When('the user specifies a vertical margin', function () {
    process.env[EnvironmentVariables.MARGIN_VERTICAL] = "8"
})
