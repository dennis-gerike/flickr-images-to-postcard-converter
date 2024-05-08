import {When} from "@cucumber/cucumber"
import {EnvironmentVariables} from "../../EnvironmentVariables"

When('the user specifies an empty caption', function () {
    process.env[EnvironmentVariables.CUSTOM_TEXT] = " "
})
