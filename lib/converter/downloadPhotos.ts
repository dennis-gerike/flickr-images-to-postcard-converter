import {FlickrClient} from "../flickr/FlickrClient"
import {getDownloadFolderPath} from "./getDownloadFolderPath"
import {determineImageFileName} from "./determineImageFileName"
import {determineMetaInformationFileName} from "./determineMetaInformationFileName"

export async function downloadPhotos(photoIds: string[], flickrClient: FlickrClient) {
    const cliProgress = require('cli-progress')
    const progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.rect)

    console.log('Downloading photos')
    progressBar.start(photoIds.length, 0)
    for (const photoId of photoIds) {
        await flickrClient.downloadOriginalImage(
            photoId,
            getDownloadFolderPath(),
            determineImageFileName(photoId)
        )
        await flickrClient.downloadImageInformation(
            photoId,
            getDownloadFolderPath(),
            determineMetaInformationFileName(photoId)
        )
        progressBar.increment()
    }
    progressBar.stop()
}
