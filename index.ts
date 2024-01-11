import "dotenv/config"
import {JimpClient} from "./lib/jimp/JimpClient"
import {FlickrClient} from "./lib/flickr/FlickrClient"

(async function () {
    const flickrClient = new FlickrClient(process.env.FLICKR_API_KEY)

    // 1. collecting the list of images that should be processed
    let flickrAlbumId = 'uncategorized'
    let flickrAlbumImageIds: string[] = []

    if (process.env.FLICKR_IMAGE_ID) {
        let flickrImageId = process.env.FLICKR_IMAGE_ID
        flickrAlbumImageIds = [flickrImageId]
    } else if (process.env.FLICKR_ALBUM_ID) {
        flickrAlbumId = process.env.FLICKR_ALBUM_ID
        flickrAlbumImageIds = await flickrClient.getAlbumImageIds(flickrAlbumId)
    }

    // 2. downloading the images from flickr and storing them locally
    for (const photoId of flickrAlbumImageIds) {
        await flickrClient.downloadOriginalImage(photoId, `./data/original/${flickrAlbumId}`, `${photoId}.jpg`)
    }

    // 3. resizing the photos to match the postcard format, then adding a label and finally a nice margin
    const jimpClient = new JimpClient()
    for (const photoId of flickrAlbumImageIds) {
        await jimpClient.setPhoto(`./data/original/${flickrAlbumId}/${photoId}.jpg`)
        jimpClient.setAspectRatio(1.5)
        const title = await flickrClient.getImageTitle(photoId) + ' » ' + process.env.CUSTOM_TEXT + ' « ' + photoId
        await jimpClient.setTextBox(title, 8, 256, 64, 0)
        jimpClient.setMargin(2, 3)
        await jimpClient.saveProcessedImage(`./data/processed/${flickrAlbumId}`, `${photoId}.jpg`)
        jimpClient.resetCanvas()
    }
})()
