import "dotenv/config"
import * as fs from "fs"
import assert from "assert"
import {Then, When} from "@cucumber/cucumber"
import {FlickrClient} from "../../../lib/flickr/FlickrClient"
import {getDownloadFolderPath} from "../getDownloadFolderPath"

When('the user selects the Flickr photo {string}', function (photoId) {
    this.photoId = photoId
})

When('the user triggers the download of the photo', async function () {
    const flickrClient = new FlickrClient(process.env.FLICKR_API_KEY)
    this.downloadPath = getDownloadFolderPath()
    this.downloadFilename = `${this.photoId}.jpg`

    await flickrClient.downloadOriginalImage(
        this.photoId,
        this.downloadPath,
        this.downloadFilename
    )
})

Then('the photo {string} should have been downloaded', function (photoId) {
    const fileExists = fs.existsSync(`${this.downloadPath}/${photoId}.jpg`)
    assert(fileExists, `File "${this.downloadPath}/${photoId}.jpg" not found`)
})
