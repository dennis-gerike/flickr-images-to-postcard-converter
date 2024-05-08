import {When} from "@cucumber/cucumber"
import {EnvironmentVariables} from "../../EnvironmentVariables"

When('the user configures the aspect ratio to be {int}:{int}', function (x: number, y: number) {
    process.env[EnvironmentVariables.ASPECT_RATIO] = `${x / y}`
})
