import {When} from "@cucumber/cucumber"
import {EnvironmentVariables} from "../../EnvironmentVariables"

When('the user specifies no vertical margin', function () {
    delete process.env[EnvironmentVariables.MARGIN_VERTICAL]
})
