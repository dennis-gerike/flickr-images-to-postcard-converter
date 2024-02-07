import {When} from "@cucumber/cucumber"
import {getDownloadFolderPath} from "../_helper/getDownloadFolderPath"

When('the user specifies the download directory', function () {
    // using our default test folder here
    process.env.DOWNLOAD_PATH = getDownloadFolderPath()
})
