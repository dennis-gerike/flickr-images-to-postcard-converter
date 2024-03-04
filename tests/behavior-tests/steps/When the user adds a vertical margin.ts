import {When} from "@cucumber/cucumber"
import {EnvironmentVariables} from "../../../lib/converter/types/EnvironmentVariables"

When('the user adds a vertical margin', function () {
    process.env[EnvironmentVariables.MARGIN_VERTICAL] = "5"
})
