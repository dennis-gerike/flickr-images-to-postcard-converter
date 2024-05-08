import {When} from "@cucumber/cucumber"
import {EnvironmentVariables} from "../../EnvironmentVariables"

When('the user does not specify the directory for the processed images', function () {
    delete process.env[EnvironmentVariables.PROCESSED_PATH]
})
