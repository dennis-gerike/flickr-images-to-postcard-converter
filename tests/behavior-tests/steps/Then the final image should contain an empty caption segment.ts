import {Then} from "@cucumber/cucumber"
import {getFixturesFolderPath} from "../_helper/getFixturesFolderPath"
import {getFailuresFolderPath} from "../_helper/getFailuresFolderPath"
import {assertImagesAreTheSame} from "../_helper/assertImagesAreTheSame"
import {EnvironmentVariables} from "../../../lib/converter/types/EnvironmentVariables"

Then('the final image should contain an empty caption segment', async function () {
    const referenceImagePath = `${getFixturesFolderPath()}/reference-images/${process.env[EnvironmentVariables.MEDIA_ID]}-${process.env[EnvironmentVariables.ASPECT_RATIO]}-empty-caption.jpg`
    const processedImagePath = `${__dirname}/../../../data/processed/${process.env[EnvironmentVariables.MEDIA_ID]}/${process.env[EnvironmentVariables.MEDIA_ID]}.jpg`
    const diffImagePath = `${getFailuresFolderPath()}/${process.env[EnvironmentVariables.MEDIA_ID]}_diff.png`

    await assertImagesAreTheSame(referenceImagePath, processedImagePath, diffImagePath)
})
