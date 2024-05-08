import {Given} from "@cucumber/cucumber"
import {EnvironmentVariables} from "../../EnvironmentVariables"

Given('the user specified a caption', function () {
    process.env[EnvironmentVariables.CUSTOM_TEXT] = "Nice photo"
})
