import {When} from "@cucumber/cucumber"
import {EnvironmentVariables} from "../../../lib/converter/types/EnvironmentVariables"

When('the user configures the aspect ratio to be {int}:{int}', function (x: number, y: number) {
    process.env[EnvironmentVariables.ASPECT_RATIO] = `${x / y}`
})
