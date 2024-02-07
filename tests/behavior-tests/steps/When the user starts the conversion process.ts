import {When} from "@cucumber/cucumber"
import {execSync} from "child_process"

When('the user starts the conversion process', async function () {
    execSync('npm start')
})
