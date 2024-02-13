import {determineToBeProcessedPhotos} from "../../../lib/converter/determineToBeProcessedPhotos"
import {FlickrClient} from "../../../lib/flickr/FlickrClient"
import {getMockedFlickrApiClient} from "../_helper/getMockedFlickrApiClient"

test('if no photo and no album were selected, then an empty list should be returned', async () => {
    delete process.env.FLICKR_IMAGE_ID
    delete process.env.FLICKR_ALBUM_ID

    const photoIds = await determineToBeProcessedPhotos(new FlickrClient('DUMMY_API_KEY', getMockedFlickrApiClient()))
    expect(photoIds.length).toBe(0)
})

test('if photo and album were selected, but each with an empty id, then an empty list should be returned', async () => {
    process.env.FLICKR_IMAGE_ID = ''
    process.env.FLICKR_ALBUM_ID = ''

    const photoIds = await determineToBeProcessedPhotos(new FlickrClient('DUMMY_API_KEY', getMockedFlickrApiClient()))
    expect(photoIds.length).toBe(0)
})

test('if a photo, but no album was selected, then a list with one item (the photo id) should be returned', async () => {
    process.env.FLICKR_IMAGE_ID = '12345'
    delete process.env.FLICKR_ALBUM_ID

    const photoIds = await determineToBeProcessedPhotos(new FlickrClient('DUMMY_API_KEY', getMockedFlickrApiClient()))
    expect(photoIds.length).toBe(1)
    expect(photoIds[0]).toEqual('12345')
})

test('if no photo, but an album was selected, then a list with all of the album\'s photo ids should be returned', async () => {
    delete process.env.FLICKR_IMAGE_ID
    process.env.FLICKR_ALBUM_ID = '12345'
    process.env.FLICKR_API_KEY = 'DUMMY_API_KEY'

    const photoIds = await determineToBeProcessedPhotos(new FlickrClient(process.env.FLICKR_API_KEY, getMockedFlickrApiClient()))
    expect(photoIds.length).toBe(10) // Why exactly 10? The mocked data source contains 10 items.
})
