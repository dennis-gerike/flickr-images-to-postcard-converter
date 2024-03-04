import {When} from "@cucumber/cucumber"
import {getDownloadFolderPath} from "../_helper/getDownloadFolderPath"
import {EnvironmentVariables} from "../../../lib/converter/types/EnvironmentVariables"

When('the user specifies the download directory', function () {
    // using our default test folder here
    process.env[EnvironmentVariables.DOWNLOAD_PATH] = getDownloadFolderPath()
})
