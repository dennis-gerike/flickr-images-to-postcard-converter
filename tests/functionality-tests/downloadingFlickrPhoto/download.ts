import {FlickrClient} from "../../../lib/flickr/FlickrClient"
import {getMockedFlickrApiClient, TestSituation} from "../_helper/getMockedFlickrApiClient"
import {getCustomDownloadFolderPath} from "../_helper/getCustomDownloadFolderPath"

/**
 * @group integration
 */
describe('Download Photo', () => {
    test('An invalid photo ID should abort the download and stop the application', async () => {
        const randomNumber = Math.floor(Math.random() * 10000)
        const targetPath = `${getCustomDownloadFolderPath()}/${randomNumber}`
        const targetFile = 'dummy.jpg'
        const flickrClient = new FlickrClient('DUMMY_API_KEY', getMockedFlickrApiClient(TestSituation.failure))

        await expect(
            flickrClient.downloadOriginalImage("DUMMY_ID", targetPath, targetFile))
            .rejects
            .toThrow(Error)
    })

    test('A valid photo should be downloaded', async () => {
        const randomNumber = Math.floor(Math.random() * 10000)
        const targetPath = `${getCustomDownloadFolderPath()}/${randomNumber}`
        const targetFile = 'dummy.jpg'
        const flickrClient = new FlickrClient('DUMMY_API_KEY', getMockedFlickrApiClient(TestSituation.success))

        await expect(
            flickrClient.downloadOriginalImage("DUMMY_ID", targetPath, targetFile))
            .resolves
            .not.toThrow(Error)
    })
})
