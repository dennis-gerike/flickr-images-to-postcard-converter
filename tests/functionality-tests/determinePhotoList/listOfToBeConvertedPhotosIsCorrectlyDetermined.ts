import {determineToBeProcessedPhotos} from "../../../lib/converter/determineToBeProcessedPhotos";

test('if no photo and no album were selected, then an empty list should be returned', async () => {
    delete process.env.FLICKR_IMAGE_ID
    delete process.env.FLICKR_ALBUM_ID

    const photoIds = await determineToBeProcessedPhotos()
    expect(photoIds.length).toBe(0)
})

test('if photo and album were selected, but each with an empty id, then an empty list should be returned', async () => {
    process.env.FLICKR_IMAGE_ID = ''
    process.env.FLICKR_ALBUM_ID = ''

    const photoIds = await determineToBeProcessedPhotos()
    expect(photoIds.length).toBe(0)
})

test('if a photo, but no album was selected, then a list with one item (the photo id) should be returned', async () => {
    process.env.FLICKR_IMAGE_ID = '12345'
    delete process.env.FLICKR_ALBUM_ID

    const photoIds = await determineToBeProcessedPhotos()
    expect(photoIds.length).toBe(1)
    expect(photoIds[0]).toEqual('12345')
})

test.todo('if no photo, but an album was selected, then a list with all of the album\'s photo ids should be returned')
