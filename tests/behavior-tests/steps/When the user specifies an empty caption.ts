import {When} from "@cucumber/cucumber"
import {EnvironmentVariables} from "../../../lib/converter/types/EnvironmentVariables"

When('the user specifies an empty caption', function () {
    process.env[EnvironmentVariables.CUSTOM_TEXT] = " "
})
