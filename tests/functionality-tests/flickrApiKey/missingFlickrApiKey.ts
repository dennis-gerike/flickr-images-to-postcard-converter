import {FlickrClient} from "../../../lib/flickr/FlickrClient"
import {getMockedFlickrApiClient} from "../_helper/getMockedFlickrApiClient"

/**
 * @group integration
 */
describe('Flickr API Key', () => {
    test('The flickr client should fail when no api key was provided', async () => {
        expect(() => {
            new FlickrClient('', getMockedFlickrApiClient())
        }).toThrow(Error)
    })

    test('The flickr client should not fail when an api key was provided', async () => {
        expect(() => {
            new FlickrClient('DUMMY_KEY', getMockedFlickrApiClient())
        }).not.toThrow(Error)
    })
})
