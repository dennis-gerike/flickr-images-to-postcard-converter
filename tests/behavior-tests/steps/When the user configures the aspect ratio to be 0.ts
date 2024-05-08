import {When} from "@cucumber/cucumber"
import {EnvironmentVariables} from "../../EnvironmentVariables"

When('the user configures the aspect ratio to be 0', function () {
    process.env[EnvironmentVariables.ASPECT_RATIO] = "0"
})
