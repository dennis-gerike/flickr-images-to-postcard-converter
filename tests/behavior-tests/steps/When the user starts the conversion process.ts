import {When} from "@cucumber/cucumber"
import {execSync} from "child_process"

When('the user starts the conversion process', function () {
    try {
        execSync('npm start')
    } catch (error) {
        this.conversionProcessFailed = true
    }
})
