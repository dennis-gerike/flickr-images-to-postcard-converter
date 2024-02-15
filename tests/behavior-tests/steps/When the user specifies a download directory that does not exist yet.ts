import {When} from "@cucumber/cucumber"
import {getDownloadFolderPath} from "../_helper/getDownloadFolderPath"

When('the user specifies a download directory that does not exist yet', function () {
    const random = Math.floor(Math.random() * 10000)
    process.env.DOWNLOAD_PATH = `${getDownloadFolderPath()}/${random}`
})
