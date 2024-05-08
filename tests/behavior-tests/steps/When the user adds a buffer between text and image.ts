import {When} from "@cucumber/cucumber"
import {EnvironmentVariables} from "../../EnvironmentVariables"

When('the user adds a buffer between text and image', function () {
    process.env[EnvironmentVariables.TEXT_VERTICAL_BUFFER] = "2.5"
})
