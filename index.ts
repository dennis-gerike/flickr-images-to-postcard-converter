import 'dotenv/config'
import {JimpClient} from "./lib/jimp/JimpClient"
import {FlickrClient} from "./lib/flickr/FlickrClient"

(async function () {
    const flickrClient = new FlickrClient(process.env.FLICKR_API_KEY)
    flickrClient.setContext(process.env.FLICKR_IMAGE_ID)
    console.log(await flickrClient.getImageTitle())
    console.log(await flickrClient.getOriginalImageWidthInPixel())
    console.log(await flickrClient.getOriginalImageHeightInPixel())
    await flickrClient.downloadOriginalImage('./data/raw') // TODO the caller also has to specify to target file name (should not be decided by the lib)

    const jimpClient = new JimpClient()
    await jimpClient.setImage(`./data/raw/${process.env.FLICKR_IMAGE_ID}.jpg`)
    await jimpClient.saveProcessedImage('./data/processed', `${process.env.FLICKR_IMAGE_ID}.jpg`)
})()
