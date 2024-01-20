import {FlickrClient} from "../flickr/FlickrClient"
import {getDownloadFolderPath} from "./getDownloadFolderPath"
import {getImageFileName} from "./getImageFileName"
import {getMetaInformationFileName} from "./getMetaInformationFileName"

export async function downloadPhotos(photoIds: string[]) {
    const cliProgress = require('cli-progress')
    const progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.rect)
    const flickrClient = new FlickrClient(process.env.FLICKR_API_KEY)

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
