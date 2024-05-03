import {determineToBeProcessedPhotos} from "../../../lib/converter/determineToBeProcessedPhotos"
import {FlickrClient} from "../../../lib/flickr/FlickrClient"
import {getMockedFlickrApiClient} from "../_helper/getMockedFlickrApiClient"
import {EnvironmentVariables} from "../../../lib/converter/types/EnvironmentVariables"

test('when no media id was selected then an error should be thrown', async () => {
    process.env[EnvironmentVariables.SOURCE_TYPE] = 'flickr-photo'
    delete process.env[EnvironmentVariables.MEDIA_ID]
    process.env[EnvironmentVariables.FLICKR_API_KEY] = 'DUMMY_API_KEY'

    await expect(
        determineToBeProcessedPhotos(new FlickrClient(process.env[EnvironmentVariables.FLICKR_API_KEY], getMockedFlickrApiClient())))
        .rejects
        .toThrow(Error)
})

test('when a photo was selected then only that photo should be returned', async () => {
    process.env[EnvironmentVariables.SOURCE_TYPE] = 'flickr-photo'
    process.env[EnvironmentVariables.MEDIA_ID] = '12345'
    process.env[EnvironmentVariables.FLICKR_API_KEY] = 'DUMMY_API_KEY'

    const photoIds = await determineToBeProcessedPhotos(new FlickrClient(process.env[EnvironmentVariables.FLICKR_API_KEY], getMockedFlickrApiClient()))

    expect(photoIds)
        .toEqual(['12345'])
})

test('when a photo album was selected then all of its photos should be returned', async () => {
    process.env[EnvironmentVariables.SOURCE_TYPE] = 'flickr-album'
    process.env[EnvironmentVariables.MEDIA_ID] = '54321'
    process.env[EnvironmentVariables.FLICKR_API_KEY] = 'DUMMY_API_KEY'

    const photoIds = await determineToBeProcessedPhotos(new FlickrClient(process.env[EnvironmentVariables.FLICKR_API_KEY], getMockedFlickrApiClient()))

    expect(photoIds.length)
        .toBe(10) // Why exactly 10? Because the mocked data source contains 10 items.
})
