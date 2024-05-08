import {When} from "@cucumber/cucumber"
import {EnvironmentVariables} from "../../EnvironmentVariables"

When('the user specifies no caption', function () {
    delete process.env[EnvironmentVariables.CUSTOM_TEXT]
})
