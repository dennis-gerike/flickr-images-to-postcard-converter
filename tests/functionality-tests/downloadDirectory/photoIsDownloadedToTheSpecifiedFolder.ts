import fs from "fs"
import assert from "assert"
import {FlickrClient} from "../../../lib/flickr/FlickrClient"
import {getMockedFlickrApiClient} from "../_helper/getMockedFlickrApiClient"
import {getCustomDownloadFolderPath} from "../_helper/getCustomDownloadFolderPath"

/**
 * @group integration
 */
test('the downloaded photo should be saved in the specified folder', async () => {
    const randomNumber = Math.floor(Math.random() * 10000)
    const targetPath = `${getCustomDownloadFolderPath()}/${randomNumber}`
    const targetFile = 'dummy.jpg'

    const flickrClient = new FlickrClient('DUMMY_API_KEY', getMockedFlickrApiClient())
    await flickrClient.downloadOriginalImage("DUMMY_ID", targetPath, targetFile)

    const fullPath = `${targetPath}/${targetFile}`
    const fileExists = fs.existsSync(fullPath)
    assert(fileExists, `File "${fullPath}" not found`)
})
