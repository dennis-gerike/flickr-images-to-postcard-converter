import assert from "assert"
import looksSame from "looks-same"
import {createFailuresFolderPath} from "./createFailuresFolderPath"

export async function assertImagesAreTheSame(referenceImageLocation: string, processedImageLocation: string, diffImageLocation: string) {
    const {
        equal,
        diffImage,
        differentPixels,
        totalPixels
    } = await looksSame(processedImageLocation, referenceImageLocation, {createDiffImage: true})

    if (!equal) {
        await createFailuresFolderPath()
        await diffImage.save(diffImageLocation)
    }

    assert.ok(equal, `Images are not the same. ${differentPixels} out of ${totalPixels} pixels are different.`)
}
