import {FlickrClient} from "../../lib/flickr/FlickrClient"
import {getMockedFlickrApiClient} from "./_helper/getMockedFlickrApiClient"

test('the flickr client should fail when no api key was provided', async () => {
    expect(() => {
        new FlickrClient('', getMockedFlickrApiClient())
    }).toThrow(Error)
})
