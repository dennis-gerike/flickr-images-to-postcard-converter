import {When} from "@cucumber/cucumber"
import {EnvironmentVariables} from "../../EnvironmentVariables"

When('the user specifies a vertical margin of {int} percent', function (margin: number) {
    process.env[EnvironmentVariables.MARGIN_VERTICAL] = String(margin)
})
