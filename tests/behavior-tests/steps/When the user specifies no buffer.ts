import {When} from "@cucumber/cucumber"
import {EnvironmentVariables} from "../../EnvironmentVariables"

When('the user specifies no buffer', function () {
    delete process.env[EnvironmentVariables.TEXT_VERTICAL_BUFFER]
})
