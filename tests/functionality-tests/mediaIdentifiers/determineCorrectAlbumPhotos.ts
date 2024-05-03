import {determineToBeProcessedPhotos} from "../../../lib/converter/determineToBeProcessedPhotos"
import {FlickrClient} from "../../../lib/flickr/FlickrClient"
import {getMockedFlickrApiClient} from "../_helper/getMockedFlickrApiClient"
import {EnvironmentVariables} from "../../../lib/converter/types/EnvironmentVariables"

test('when an album was selected then a list of its photo ids should be returned', async () => {
    process.env[EnvironmentVariables.SOURCE_TYPE] = 'flickr-album'
    process.env[EnvironmentVariables.MEDIA_ID] = '12345'
    process.env[EnvironmentVariables.FLICKR_API_KEY] = 'DUMMY_API_KEY'

    const photoIds = await determineToBeProcessedPhotos(new FlickrClient(process.env[EnvironmentVariables.FLICKR_API_KEY], getMockedFlickrApiClient()))

    expect(photoIds.length)
        .toBe(10) // Why exactly 10? Because the mocked data source contains 10 items.
})
