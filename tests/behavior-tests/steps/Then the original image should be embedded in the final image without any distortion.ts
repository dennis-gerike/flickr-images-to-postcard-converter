import {Then} from "@cucumber/cucumber"
import {getFixturesFolderPath} from "../_helper/getFixturesFolderPath"
import {getFailuresFolderPath} from "../_helper/getFailuresFolderPath"
import {assertImagesAreTheSame} from "../_helper/assertImagesAreTheSame"
import {EnvironmentVariables} from "../../EnvironmentVariables"

Then('the original image should be embedded in the final image without any distortion', {timeout: 10000}, async function () {
    const referenceImagePath = `${getFixturesFolderPath()}/reference-images/${process.env[EnvironmentVariables.MEDIA_ID]}-${process.env[EnvironmentVariables.ASPECT_RATIO]}.jpg`
    const processedImagePath = `${__dirname}/../../../data/processed/${process.env[EnvironmentVariables.MEDIA_ID]}/${process.env[EnvironmentVariables.MEDIA_ID]}.jpg`
    const diffImagePath = `${getFailuresFolderPath()}/${process.env[EnvironmentVariables.MEDIA_ID]}_diff.png`

    await assertImagesAreTheSame(referenceImagePath, processedImagePath, diffImagePath)
})
