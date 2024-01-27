import "dotenv/config"
import * as fs from "fs"
import assert from "assert"
import {Then, When} from "@cucumber/cucumber"
import {FlickrClient} from "../../../lib/flickr/FlickrClient"
import {getDownloadFolderPath} from "../getDownloadFolderPath"

When('the user selects the Flickr photo album {string}', function (photoAlbumId) {
    this.photoAlbumId = photoAlbumId
})

When('the user triggers the download of the photo album', async function () {
    const flickrClient = new FlickrClient(process.env.FLICKR_API_KEY)
    this.downloadPath = `${getDownloadFolderPath()}/album`
    this.downloadFilenames = []
    this.albumPhotoIds = await flickrClient.getAlbumImageIds(this.photoAlbumId)

    for (const photoId of this.albumPhotoIds) {
        const filename = `${photoId}.jpg`
        this.downloadFilenames.push(filename)
        await flickrClient.downloadOriginalImage(
            photoId,
            this.downloadPath,
            filename
        )
    }
})

Then('all photos of the album {string} should have been downloaded', function (photoAlbumId) {
    const folderExists = fs.existsSync(`${this.downloadPath}`)
    assert(folderExists, `Folder "${this.downloadPath}" not found`)

    for (const photoId of this.downloadFilenames) {
        const fileExists = fs.existsSync(`${this.downloadPath}/${photoId}`)
        assert(fileExists, `File "${this.downloadPath}/${photoId}" not found`)
    }
})
