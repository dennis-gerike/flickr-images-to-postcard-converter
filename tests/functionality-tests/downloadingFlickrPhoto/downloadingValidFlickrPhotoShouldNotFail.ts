import {determineMetaInformationFileName} from "../../../lib/converter/determineMetaInformationFileName"
import {FlickrClient} from "../../../lib/flickr/FlickrClient"
import {getDownloadFolderPath} from "../_helper/getDownloadFolderPath"
import {getMockedFlickrApiClient} from "../_helper/getMockedFlickrApiClient"
import {getFixturesFolderPath} from "../../behavior-tests/_helper/getFixturesFolderPath"

test('downloading a valid Flickr photo should not fail', async () => {
    const flickrClient = new FlickrClient('DUMMY_API_KEY', getMockedFlickrApiClient())
    const validPhotoId = require(`${getFixturesFolderPath()}/api-responses/success/flickr.photos.getInfo`).photo.id

    await expect(
        flickrClient.downloadImageInformation(
            validPhotoId,
            getDownloadFolderPath(),
            determineMetaInformationFileName(validPhotoId)
        ))
        .resolves
        .not.toThrow(Error)
})
