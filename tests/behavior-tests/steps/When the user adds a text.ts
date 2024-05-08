import {When} from "@cucumber/cucumber"
import {EnvironmentVariables} from "../../EnvironmentVariables"

When('the user adds a text', function () {
    process.env[EnvironmentVariables.CUSTOM_TEXT] = "TEST 123"
})
