import {FlickrClient} from "../flickr/FlickrClient"
import {determineDownloadFolderPath} from "./determineDownloadFolderPath"
import {determineImageFileName} from "./determineImageFileName"
import {determineMetaInformationFileName} from "./determineMetaInformationFileName"
import {determineMediaId} from "./determineMediaId"

export async function downloadPhotos(photoIds: string[], flickrClient: FlickrClient) {
    const cliProgress = require('cli-progress')
    const progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.rect)

    console.log('Downloading photos')
    progressBar.start(photoIds.length, 0)
    for (const photoId of photoIds) {
        await flickrClient.downloadOriginalImage(
            photoId,
            determineDownloadFolderPath(determineMediaId()),
            determineImageFileName(photoId)
        )
        await flickrClient.downloadImageInformation(
            photoId,
            determineDownloadFolderPath(determineMediaId()),
            determineMetaInformationFileName(photoId)
        )
        progressBar.increment()
    }
    progressBar.stop()
}
