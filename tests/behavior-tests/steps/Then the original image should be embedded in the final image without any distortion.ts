import {Then} from "@cucumber/cucumber"
import assert from "assert"
import looksSame from "looks-same"
import {getFixturesFolderPath} from "../_helper/getFixturesFolderPath"
import {getFailuresFolderPath} from "../_helper/getFailuresFolderPath"
import {createFailuresFolderPath} from "../_helper/createFailuresFolderPath"

Then('the original image should be embedded in the final image without any distortion', {timeout: 10000}, async function () {
    const referenceImagePath = `${getFixturesFolderPath()}/reference-images/${process.env.FLICKR_IMAGE_ID}.jpg`
    const processedImagePath = `${__dirname}/../../../data/processed/null/${process.env.FLICKR_IMAGE_ID}.jpg`
    const diffImagePath = `${getFailuresFolderPath()}/${process.env.FLICKR_IMAGE_ID}_diff.png`
    const {
        equal,
        diffImage,
        differentPixels,
        totalPixels
    } = await looksSame(referenceImagePath, processedImagePath, {createDiffImage: true})

    if (!equal) {
        await createFailuresFolderPath()
        await diffImage.save(diffImagePath)
        console.log(`${differentPixels} out of ${totalPixels} pixels are different.`)
    }

    assert.equal(equal, true)
})
