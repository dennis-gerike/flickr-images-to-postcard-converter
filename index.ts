import "dotenv/config"
import {JimpClient} from "./lib/jimp/JimpClient"
import {FlickrClient} from "./lib/flickr/FlickrClient"

(async function () {
    const cliProgress = require('cli-progress')
    const progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.rect)
    const flickrClient = new FlickrClient(process.env.FLICKR_API_KEY)
    const jimpClient = new JimpClient()

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
    console.log('Downloading photos')
    progressBar.start(flickrAlbumImageIds.length, 0)
    for (const photoId of flickrAlbumImageIds) {
        await flickrClient.downloadOriginalImage(photoId, `./data/original/${flickrAlbumId}`, `${photoId}.jpg`)
        await flickrClient.downloadImageInformation(photoId, `./data/original/${flickrAlbumId}`, `${photoId}.json`)
        progressBar.increment()
    }
    progressBar.stop()

    // 3. resizing the photos to match the postcard format, then adding a label and finally a nice margin
    console.log('Converting photos')
    progressBar.start(flickrAlbumImageIds.length, 0)
    for (const photoId of flickrAlbumImageIds) {
        await jimpClient.setPhoto(`./data/original/${flickrAlbumId}/${photoId}.jpg`)
        jimpClient.setAspectRatio(Number(process.env.ASPECT_RATIO))
        const title = await flickrClient.getImageTitle(photoId) + ' | ' + process.env.CUSTOM_TEXT + ' | ' + photoId
        const textColor = getTextColor()
        const textVerticalBuffer = Number(process.env.TEXT_VERTICAL_BUFFER ?? 0)
        await jimpClient.setTextBox({
            text: title,
            relativeHeight: 5,
            red: textColor.red,
            green: textColor.green,
            blue: textColor.blue,
            relativeVerticalBuffer: textVerticalBuffer,
        })
        jimpClient.setMargin(Number(process.env.MARGIN_HORIZONTAL), Number(process.env.MARGIN_VERTICAL))
        await jimpClient.saveProcessedImage(`./data/processed/${flickrAlbumId}`, `${photoId}.jpg`)
        jimpClient.resetCanvas()

        progressBar.increment()
    }
    progressBar.stop()
})()

function getTextColor() {
    let red = 0
    let green = 0
    let blue = 0

    if (process.env.TEXT_COLOR) {
        const textColor = (process.env.TEXT_COLOR as string).split(',')
        if (textColor.length !== 3) {
            console.warn('Invalid RGB colors provided! Using default values instead.')
        } else {
            red = Number(textColor[0])
            green = Number(textColor[1])
            blue = Number(textColor[2])
        }
    }

    return {red, green, blue}
}
