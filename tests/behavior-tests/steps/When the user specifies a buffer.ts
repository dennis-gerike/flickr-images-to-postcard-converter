import {When} from "@cucumber/cucumber"
import {EnvironmentVariables} from "../../../lib/converter/types/EnvironmentVariables"

When('the user specifies a buffer', function () {
    process.env[EnvironmentVariables.TEXT_VERTICAL_BUFFER] = "10"
})
