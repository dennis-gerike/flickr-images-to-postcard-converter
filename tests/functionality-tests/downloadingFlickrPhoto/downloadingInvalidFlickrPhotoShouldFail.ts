import {getMetaInformationFileName} from "../../../lib/converter/getMetaInformationFileName"
import {FlickrClient} from "../../../lib/flickr/FlickrClient"
import {getDownloadFolderPath} from "../_helper/getDownloadFolderPath"
import {getMockedFlickrApiClient, TestSituation} from "../_helper/getMockedFlickrApiClient"

test('downloading a Flickr photo that does not exist should fail', async () => {
    const invalidFlickrId = '-5'
    const flickrClient = new FlickrClient('DUMMY_API_KEY', getMockedFlickrApiClient(TestSituation.failure))

    await expect(
        flickrClient.downloadImageInformation(
            invalidFlickrId,
            getDownloadFolderPath(),
            getMetaInformationFileName(invalidFlickrId)
        ))
        .rejects
        .toThrow(Error)
})
