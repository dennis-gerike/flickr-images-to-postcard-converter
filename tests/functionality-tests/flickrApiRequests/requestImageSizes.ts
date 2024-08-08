import {getMockedFlickrApiClient, TestSituation} from "../_helper/getMockedFlickrApiClient"
import {getFixturesFolderPath} from "../../behavior-tests/_helper/getFixturesFolderPath"
import {ApiError} from "../../../lib/flickr/types/internal/ApiError"
import {fetchImageSizes} from "../../../lib/flickr/apiRequests/fetchImageSizes"

/**
 * @group integration
 */
describe('Interacting with the (mocked) Flickr API', () => {
    test('Requesting the image sizes for a valid Flickr photo should be possible', async () => {
        const imageSizes = await
            fetchImageSizes(
                require(`${getFixturesFolderPath()}/21by9`).id,
                'DUMMY_KEY',
                getMockedFlickrApiClient()
            )

        expect(imageSizes)
            .toHaveProperty('sizes.size[0].width')
    })

    test('When the request failed (e.g. http code 4xx or 5xx) then an api error should be thrown', async () => {
        await expect(fetchImageSizes(require(`${getFixturesFolderPath()}/21by9`).id, 'DUMMY_KEY', getMockedFlickrApiClient(TestSituation.failure)))
            .rejects
            .toThrow(ApiError)
    })
})
