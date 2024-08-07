import {fetchImageSizes} from "../../../lib/flickr/apiRequests/fetchImageSizes"
import {determineFlickrApiKey} from "../../../lib/converter/determineFlickrApiKey"
import {getFixturesFolderPath} from "../../behavior-tests/_helper/getFixturesFolderPath"

/**
 * Dependencies:
 *  - Flickr API key (via environment variable)
 */
describe('Flickr API Requests', () => {
    test('Fetching the image sizes for a valid Flickr photo should not throw an error', async () => {
        await expect(
            fetchImageSizes(require(`${getFixturesFolderPath()}/21by9`).id, determineFlickrApiKey()))
            .resolves
            .not.toThrow(Error)
    })

    test('Fetching the image sizes for a valid Flickr photo should return the correct data structure', async () => {
        await expect(
            fetchImageSizes(require(`${getFixturesFolderPath()}/21by9`).id, determineFlickrApiKey()))
            .resolves
            .toHaveProperty('sizes.size[0].height') // TODO this is just a spot test -> needs to be a test for the whole data structure
    })
})
