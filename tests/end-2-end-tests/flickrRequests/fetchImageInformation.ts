import {determineFlickrApiKey} from "../../../lib/converter/determineFlickrApiKey"
import {getFixturesFolderPath} from "../../behavior-tests/_helper/getFixturesFolderPath"
import {fetchImageInformation} from "../../../lib/flickr/apiRequests/fetchImageInformation"

/**
 * Dependencies:
 *  - Flickr API key (via environment variable)
 */
describe('Flickr API Requests', () => {
    test('Fetching information for a valid Flickr photo should not throw an error', async () => {
        await expect(
            fetchImageInformation(require(`${getFixturesFolderPath()}/21by9`).id, determineFlickrApiKey()))
            .resolves
            .not.toThrow(Error)
    })

    test('Fetching information for a valid Flickr photo should return the correct data structure', async () => {
        await expect(
            fetchImageInformation(require(`${getFixturesFolderPath()}/21by9`).id, determineFlickrApiKey()))
            .resolves
            .toHaveProperty('photo.urls.url') // TODO this is just a spot test -> needs to be a test for the whole data structure
    })
})
