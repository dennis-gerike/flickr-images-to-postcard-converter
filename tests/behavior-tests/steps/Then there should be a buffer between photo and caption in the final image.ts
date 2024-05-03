import {Then} from "@cucumber/cucumber"
import {getFixturesFolderPath} from "../_helper/getFixturesFolderPath"
import {getFailuresFolderPath} from "../_helper/getFailuresFolderPath"
import {assertImagesAreTheSame} from "../_helper/assertImagesAreTheSame"
import {EnvironmentVariables} from "../../../lib/converter/types/EnvironmentVariables"

Then('there should be a buffer between photo and caption in the final image', async function () {
    const referenceImagePath = `${getFixturesFolderPath()}/reference-images/${process.env[EnvironmentVariables.MEDIA_ID]}-${process.env[EnvironmentVariables.ASPECT_RATIO]}-with-${process.env[EnvironmentVariables.TEXT_VERTICAL_BUFFER]}-buffer.jpg`
    const processedImagePath = `${__dirname}/../../../data/processed/${process.env[EnvironmentVariables.MEDIA_ID]}/${process.env[EnvironmentVariables.MEDIA_ID]}.jpg`
    const diffImagePath = `${getFailuresFolderPath()}/${process.env[EnvironmentVariables.MEDIA_ID]}_diff.png`

    await assertImagesAreTheSame(referenceImagePath, processedImagePath, diffImagePath)
})
