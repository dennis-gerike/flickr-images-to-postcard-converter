import "dotenv/config"
import {JimpClient} from "./lib/jimp/JimpClient"
import {FlickrClient} from "./lib/flickr/FlickrClient"
import {ImageInformation} from "./lib/flickr/types/internal/ImageInformation"

(async function () {
    const photoIds = await determineToBeProcessedPhotos()
    await downloadPhotos(photoIds)
    await convertPhotos(photoIds)
})()

async function determineToBeProcessedPhotos(): Promise<string[]> {
    const photoId = getPhotoId()
    if (photoId !== null) {
        return [photoId]
    }

    const albumId = getAlbumId()
    if (albumId !== null) {
        const flickrClient = new FlickrClient(process.env.FLICKR_API_KEY)
        return await flickrClient.getAlbumImageIds(albumId)
    }

    return []
}

function getPhotoId() {
    if (process.env.FLICKR_IMAGE_ID) {
        return process.env.FLICKR_IMAGE_ID
    }

    return null
}

function getAlbumId() {
    if (process.env.FLICKR_ALBUM_ID) {
        return process.env.FLICKR_ALBUM_ID
    }

    return null
}

async function downloadPhotos(photoIds: string[]) {
    const cliProgress = require('cli-progress')
    const progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.rect)
    const flickrClient = new FlickrClient(process.env.FLICKR_API_KEY)

    console.log('Downloading photos')
    progressBar.start(photoIds.length, 0)
    for (const photoId of photoIds) {
        await flickrClient.downloadOriginalImage(photoId, `./data/original/${getAlbumId()}`, `${photoId}.jpg`)
        await flickrClient.downloadImageInformation(photoId, `./data/original/${getAlbumId()}`, `${photoId}.json`)
        progressBar.increment()
    }
    progressBar.stop()
}

async function convertPhotos(photoIds: string[]) {
    const cliProgress = require('cli-progress')
    const progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.rect)
    const jimpClient = new JimpClient()

    // resizing the photos to match the postcard format, then adding a label and finally a nice margin
    console.log('Converting photos')
    progressBar.start(photoIds.length, 0)
    for (const photoId of photoIds) {
        await jimpClient.setPhoto(`./data/original/${getAlbumId()}/${photoId}.jpg`)
        jimpClient.setAspectRatio(Number(process.env.ASPECT_RATIO))
        const photoInformation = require(`./data/original/${getAlbumId()}/${photoId}.json`) as ImageInformation
        const title = photoInformation.title + ' | ' + process.env.CUSTOM_TEXT + ' | ' + photoId
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
        await jimpClient.saveProcessedImage(`./data/processed/${getAlbumId()}`, `${photoId}.jpg`)
        jimpClient.resetCanvas()

        progressBar.increment()
    }
    progressBar.stop()
}

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
