import {When} from "@cucumber/cucumber"
import {EnvironmentVariables} from "../../EnvironmentVariables"

When('the user specifies a caption', function () {
    process.env[EnvironmentVariables.CUSTOM_TEXT] = "Nice photo"
})
