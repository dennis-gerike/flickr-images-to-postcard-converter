import {Given} from "@cucumber/cucumber"
import {EnvironmentVariables} from "../../../lib/converter/types/EnvironmentVariables"

Given('the user specified a caption', function () {
    process.env[EnvironmentVariables.CUSTOM_TEXT] = "Nice photo"
})
