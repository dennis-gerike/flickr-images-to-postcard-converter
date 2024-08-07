import {determineFlickrApiKey} from "../../../lib/converter/determineFlickrApiKey"
import {getFixturesFolderPath} from "../../behavior-tests/_helper/getFixturesFolderPath"
import {fetchAlbumInformation} from "../../../lib/flickr/apiRequests/fetchAlbumInformation"

/**
 * Dependencies:
 *  - Flickr API key (via environment variable)
 */
describe('Flickr API Requests', () => {
    test('Fetching information for a valid Flickr album should not throw an error', async () => {
        await expect(
            fetchAlbumInformation(require(`${getFixturesFolderPath()}/album`).id, determineFlickrApiKey()))
            .resolves
            .not.toThrow(Error)
    })

    test('Fetching information for a valid Flickr album should return the correct data structure', async () => {
        await expect(
            fetchAlbumInformation(require(`${getFixturesFolderPath()}/album`).id, determineFlickrApiKey()))
            .resolves
            .toHaveProperty('photoset.id') // TODO this is just a spot test -> needs to be a test for the whole data structure
    })
})
