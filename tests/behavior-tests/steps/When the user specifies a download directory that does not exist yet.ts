import {When} from "@cucumber/cucumber"
import {getDownloadFolderPath} from "../_helper/getDownloadFolderPath"
import {EnvironmentVariables} from "../../../lib/converter/types/EnvironmentVariables"

When('the user specifies a download directory that does not exist yet', function () {
    const random = Math.floor(Math.random() * 10000)
    process.env[EnvironmentVariables.DOWNLOAD_PATH] = `${getDownloadFolderPath()}/${random}`
})
