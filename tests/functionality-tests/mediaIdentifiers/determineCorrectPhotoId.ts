import {EnvironmentVariables} from "../../../lib/converter/types/EnvironmentVariables"
import {determinePhotoId} from "../../../lib/converter/determinePhotoId"

test('when no photo id was configured then null should be determined', () => {
    delete process.env[EnvironmentVariables.FLICKR_IMAGE_ID]
    const determinedPhotoId = determinePhotoId()

    expect(determinedPhotoId).toBeNull()
})

test('when the photo id is empty then null should be determined', () => {
    process.env[EnvironmentVariables.FLICKR_IMAGE_ID] = ""
    const determinedPhotoId = determinePhotoId()

    expect(determinedPhotoId).toBeNull()
})

test('a potentially valid photo id should be determined correctly', () => {
    process.env[EnvironmentVariables.FLICKR_IMAGE_ID] = "123456789"
    const determinedPhotoId = determinePhotoId()

    expect(determinedPhotoId).toEqual("123456789")
})
