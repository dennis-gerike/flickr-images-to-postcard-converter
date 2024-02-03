import {Before, Given, Then, When} from "@cucumber/cucumber"
import assert from "assert"
import sizeOf from "image-size"
import {JimpClient} from "../../../lib/jimp/JimpClient"
import {getFixturesFolderPath} from "../_helper/getFixturesFolderPath"
import {getProcessedFolderPath} from "../_helper/getProcessedFolderPath"

Before(async function () {
    this.imagePool = []
    this.jimpClient = new JimpClient()
})

Given('there exists an original image with an aspect ratio of 16:9', function () {
    this.imagePool["16:9"] = '16by9_medium.jpg'
})

When('the user selects an original image with an aspect ratio of 16:9', async function () {
    this.selectedImage = this.imagePool["16:9"]
    await this.jimpClient.setPhoto(`${getFixturesFolderPath()}/${this.selectedImage}`)
})

When('the user sets the aspect ratio of the final image to 3:2', function () {
    this.jimpClient.setAspectRatio(3 / 2)
})

Then('the final image should have an aspect ratio of 3:2', async function () {
    // applying all settings from the previous steps and producing the final image
    await this.jimpClient.saveProcessedImage(getProcessedFolderPath(), this.selectedImage)

    // checking the dimensions of the processed image
    const dimensions = sizeOf(`${getProcessedFolderPath()}/${this.selectedImage}`)
    if (dimensions.width && dimensions.height) {
        const expectedAspectRatio = 1.5
        const actualAspectRatio = dimensions.width / dimensions.height
        const epsilon = 0.01
        assert(Math.abs(expectedAspectRatio - actualAspectRatio) < epsilon)

        return
    }

    assert(false)
})
