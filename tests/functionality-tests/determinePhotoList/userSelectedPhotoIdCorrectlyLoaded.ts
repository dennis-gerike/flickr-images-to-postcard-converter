import {getPhotoId} from "../../../lib/converter/getPhotoId"

test('when photo id is NOT set, then null should be returned', async () => {
    delete process.env.FLICKR_IMAGE_ID

    const photoId = getPhotoId()
    expect(photoId).toBeNull()
})

test('when photo id IS set, then the id should be returned', async () => {
    process.env.FLICKR_IMAGE_ID = '12345'

    const photoId = getPhotoId()
    expect(photoId).not.toBeNull()
    expect(photoId).toBe('12345')
})

test('when photo id is set, but with an EMPTY string, then null should be returned', async () => {
    process.env.FLICKR_IMAGE_ID = ''

    const photoId = getPhotoId()
    expect(photoId).toBeNull()
})
