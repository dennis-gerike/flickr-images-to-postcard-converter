import {When} from "@cucumber/cucumber"
import {EnvironmentVariables} from "../../../lib/converter/types/EnvironmentVariables"

When('the user specifies a buffer of {int} percent', function (bufferSize: number) {
    process.env[EnvironmentVariables.TEXT_VERTICAL_BUFFER] = String(bufferSize)
})
