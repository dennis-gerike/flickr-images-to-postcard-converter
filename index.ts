import 'dotenv/config'
import {JimpClient} from "./lib/jimp/JimpClient"
import {FlickrClient} from "./lib/flickr/FlickrClient"

(async function () {
    const flickrClient = new FlickrClient(process.env.FLICKR_API_KEY)
    const flickrImageId = process.env.FLICKR_IMAGE_ID

    flickrClient.setContext(flickrImageId)
    console.log(await flickrClient.getImageTitle())
    console.log(await flickrClient.getOriginalImageWidthInPixel())
    console.log(await flickrClient.getOriginalImageHeightInPixel())
    await flickrClient.downloadOriginalImage('./data/raw', `${flickrImageId}.jpg`)

    const jimpClient = new JimpClient()
    await jimpClient.setImage(`./data/raw/${process.env.FLICKR_IMAGE_ID}.jpg`)
    jimpClient.setAspectRatio(1.5)
    await jimpClient.saveProcessedImage('./data/processed', `${flickrImageId}.jpg`)
})()
