import fs from "fs"
import assert from "assert"
import {getMockedFlickrApiClient} from "../_helper/getMockedFlickrApiClient"
import {FlickrClient} from "../../../lib/flickr/FlickrClient"
import {getDownloadFolderPath} from "../_helper/getDownloadFolderPath"

test('when the user specified a download directory, then this should be used for the photos', async () => {
    const flickrClient = new FlickrClient('DUMMY_API_KEY', getMockedFlickrApiClient())
    const randomNumber = Math.floor(Math.random() * 10000)
    const targetPath = `${getDownloadFolderPath()}/${randomNumber}`

    const targetFile = 'dummy.jpg'
    await flickrClient.downloadOriginalImage("DUMMY_ID", targetPath, targetFile)
    const fullPath = `${targetPath}/${targetFile}`
    const fileExists = fs.existsSync(fullPath)
    assert(fileExists, `File "${fullPath}" not found`)
})

test('when the user specified a download directory, then this should be used for the meta information', async () => {
    const flickrClient = new FlickrClient('DUMMY_API_KEY', getMockedFlickrApiClient())
    const randomNumber = Math.floor(Math.random() * 10000)
    const targetPath = `${getDownloadFolderPath()}/${randomNumber}`

    const targetFile = 'dummy.json'
    await flickrClient.downloadImageInformation("DUMMY_ID", targetPath, targetFile)
    const fullPath = `${targetPath}/${targetFile}`
    const fileExists = fs.existsSync(fullPath)
    assert(fileExists, `File "${fullPath}" not found`)
})
