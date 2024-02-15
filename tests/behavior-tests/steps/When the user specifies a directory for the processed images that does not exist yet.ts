import {When} from "@cucumber/cucumber"
import {getProcessedFolderPath} from "../_helper/getProcessedFolderPath"

When('the user specifies a directory for the processed images that does not exist yet', function () {
    const random = Math.floor(Math.random() * 10000)
    process.env.PROCESSED_PATH = `${getProcessedFolderPath()}/${random}`
})
