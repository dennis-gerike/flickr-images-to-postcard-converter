import {determineToBeProcessedPhotos} from "../../../lib/converter/determineToBeProcessedPhotos"
import {FlickrClient} from "../../../lib/flickr/FlickrClient"
import {getMockedFlickrApiClient, TestSituation} from "../_helper/getMockedFlickrApiClient"
import {EnvironmentVariables} from "../../EnvironmentVariables"

/**
 * @group integration
 */
describe('Media ID', () => {
    describe('Determine photo(s)', () => {
        test('When no media id was selected then an error should be thrown', async () => {
            process.env[EnvironmentVariables.SOURCE_TYPE] = 'flickr-photo'
            delete process.env[EnvironmentVariables.MEDIA_ID]

            await expect(
                determineToBeProcessedPhotos(new FlickrClient('DUMMY_API_KEY', getMockedFlickrApiClient())))
                .rejects
                .toThrow(Error)
        })

        test('When a photo was selected then only that photo should be returned', async () => {
            process.env[EnvironmentVariables.SOURCE_TYPE] = 'flickr-photo'
            process.env[EnvironmentVariables.MEDIA_ID] = '12345'

            const photoIds = await determineToBeProcessedPhotos(new FlickrClient('DUMMY_API_KEY', getMockedFlickrApiClient()))

            expect(photoIds)
                .toEqual(['12345'])
        })

        test('When an album was selected then all of its photos should be returned', async () => {
            process.env[EnvironmentVariables.SOURCE_TYPE] = 'flickr-album'
            process.env[EnvironmentVariables.MEDIA_ID] = '54321'

            const photoIds = await determineToBeProcessedPhotos(new FlickrClient('DUMMY_API_KEY', getMockedFlickrApiClient()))

            expect(photoIds.length)
                .toBe(10) // Why exactly 10? Because the mocked data source contains 10 items.
        })

        test('Requesting photos for an album which does not exist should fail', async () => {
            const invalidFlickrId = '-5'
            const flickrClient = new FlickrClient('DUMMY_API_KEY', getMockedFlickrApiClient(TestSituation.failure))

            await expect(
                flickrClient.getAlbumImageIds(invalidFlickrId))
                .rejects
                .toThrow(Error)
        })
    })
})
