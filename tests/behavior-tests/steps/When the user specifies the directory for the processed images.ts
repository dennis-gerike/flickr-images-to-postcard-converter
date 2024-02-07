import {When} from "@cucumber/cucumber"
import {getProcessedFolderPath} from "../_helper/getProcessedFolderPath"

When('the user specifies the directory for the processed images', function () {
    // using our default test folder here
    process.env.PROCESSED_PATH = getProcessedFolderPath()
})
