import {getMockedFlickrApiClient, TestSituation} from "../_helper/getMockedFlickrApiClient"
import {fetchImageInformation} from "../../../lib/flickr/apiRequests/fetchImageInformation"
import {getFixturesFolderPath} from "../../behavior-tests/_helper/getFixturesFolderPath"
import {ApiError} from "../../../lib/flickr/types/internal/ApiError"

/**
 * @group integration
 */
describe('Interacting with the (mocked) Flickr API', () => {
    test('Requesting information for a valid Flickr photo should be possible', async () => {
        const imageInformation = await
            fetchImageInformation(
                require(`${getFixturesFolderPath()}/21by9`).id,
                'DUMMY_KEY',
                getMockedFlickrApiClient()
            )

        expect(imageInformation)
            .toHaveProperty('photo.id')
    })

    test('When the request failed (e.g. http code 4xx or 5xx) then an api error should be thrown', async () => {
        await expect(fetchImageInformation(require(`${getFixturesFolderPath()}/21by9`).id, 'DUMMY_KEY', getMockedFlickrApiClient(TestSituation.failure)))
            .rejects
            .toThrow(ApiError)
    })
})
