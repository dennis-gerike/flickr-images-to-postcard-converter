import {When} from "@cucumber/cucumber"
import {getFixturesFolderPath} from "../_helper/getFixturesFolderPath"
import {getFailuresFolderPath} from "../_helper/getFailuresFolderPath"
import {assertImagesAreTheSame} from "../_helper/assertImagesAreTheSame"
import {EnvironmentVariables} from "../../../lib/converter/types/EnvironmentVariables"

When('the processed image should contain a photo', async function () {
    const referenceImagePath = `${getFixturesFolderPath()}/reference-images/${process.env[EnvironmentVariables.FLICKR_IMAGE_ID]}-${process.env[EnvironmentVariables.ASPECT_RATIO]}-caption.jpg`
    const processedImagePath = `${__dirname}/../../../data/processed/null/${process.env[EnvironmentVariables.FLICKR_IMAGE_ID]}.jpg`
    const diffImagePath = `${getFailuresFolderPath()}/${process.env[EnvironmentVariables.FLICKR_IMAGE_ID]}_diff.png`

    await assertImagesAreTheSame(referenceImagePath, processedImagePath, diffImagePath)
})
