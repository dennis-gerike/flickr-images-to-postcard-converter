import {determinePhotoId} from "../../../lib/converter/determinePhotoId"
import {EnvironmentVariables} from "../../../lib/converter/types/EnvironmentVariables"

test('when photo id is NOT set, then null should be returned', async () => {
    delete process.env[EnvironmentVariables.FLICKR_IMAGE_ID]

    const photoId = determinePhotoId()
    expect(photoId).toBeNull()
})

test('when photo id IS set, then the id should be returned', async () => {
    process.env[EnvironmentVariables.FLICKR_IMAGE_ID] = '12345'

    const photoId = determinePhotoId()
    expect(photoId).not.toBeNull()
    expect(photoId).toBe('12345')
})

test('when photo id is set, but with an EMPTY string, then null should be returned', async () => {
    process.env[EnvironmentVariables.FLICKR_IMAGE_ID] = ''

    const photoId = determinePhotoId()
    expect(photoId).toBeNull()
})
