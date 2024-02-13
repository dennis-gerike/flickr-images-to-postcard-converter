import {FlickrClient} from "../flickr/FlickrClient"
import {getDownloadFolderPath} from "./getDownloadFolderPath"
import {getImageFileName} from "./getImageFileName"
import {getMetaInformationFileName} from "./getMetaInformationFileName"

export async function downloadPhotos(photoIds: string[], flickrClient: FlickrClient) {
    const cliProgress = require('cli-progress')
    const progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.rect)

    console.log('Downloading photos')
    progressBar.start(photoIds.length, 0)
    for (const photoId of photoIds) {
        await flickrClient.downloadOriginalImage(
            photoId,
            getDownloadFolderPath(),
            getImageFileName(photoId)
        )
        await flickrClient.downloadImageInformation(
            photoId,
            getDownloadFolderPath(),
            getMetaInformationFileName(photoId)
        )
        progressBar.increment()
    }
    progressBar.stop()
}
