import {When} from "@cucumber/cucumber"
import {getProcessedFolderPath} from "../_helper/getProcessedFolderPath"
import {EnvironmentVariables} from "../../EnvironmentVariables"

When('the user specifies the directory for the processed images', function () {
    // using our default test folder here
    process.env[EnvironmentVariables.PROCESSED_PATH] = getProcessedFolderPath()
})
