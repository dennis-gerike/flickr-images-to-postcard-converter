import {When} from "@cucumber/cucumber"
import {getProcessedFolderPath} from "../_helper/getProcessedFolderPath"
import {EnvironmentVariables} from "../../EnvironmentVariables"

When('the user specifies a directory for the processed images that does not exist yet', function () {
    const random = Math.floor(Math.random() * 10000)
    process.env[EnvironmentVariables.PROCESSED_PATH] = `${getProcessedFolderPath()}/${random}`
})
