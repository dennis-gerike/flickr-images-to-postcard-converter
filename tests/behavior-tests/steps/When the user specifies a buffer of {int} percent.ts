import {When} from "@cucumber/cucumber"
import {EnvironmentVariables} from "../../EnvironmentVariables"

When('the user specifies a buffer of {int} percent', function (bufferSize: number) {
    process.env[EnvironmentVariables.TEXT_VERTICAL_BUFFER] = String(bufferSize)
})
