import {getMockedFlickrApiClient, TestSituation} from "../_helper/getMockedFlickrApiClient"
import {getFixturesFolderPath} from "../../behavior-tests/_helper/getFixturesFolderPath"
import {ApiError} from "../../../lib/flickr/types/internal/ApiError"
import {fetchAlbumInformation} from "../../../lib/flickr/apiRequests/fetchAlbumInformation"

/**
 * @group integration
 */
describe('Interacting with the (mocked) Flickr API', () => {
    test('Requesting information for a valid Flickr album should be possible', async () => {
        const albumInformation = await
            fetchAlbumInformation(
                require(`${getFixturesFolderPath()}/album`).id,
                'DUMMY_KEY',
                getMockedFlickrApiClient()
            )

        expect(albumInformation)
            .toHaveProperty('photoset.id')
    })

    test('When the request failed (e.g. http code 4xx or 5xx) then an api error should be thrown', async () => {
        await expect(fetchAlbumInformation(require(`${getFixturesFolderPath()}/album`).id, 'DUMMY_KEY', getMockedFlickrApiClient(TestSituation.failure)))
            .rejects
            .toThrow(ApiError)
    })
})
