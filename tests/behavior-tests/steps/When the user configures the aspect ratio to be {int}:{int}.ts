import {When} from "@cucumber/cucumber"

When('the user configures the aspect ratio to be {int}:{int}', function (x: number, y: number) {
    process.env.ASPECT_RATIO = `${x / y}`
})
