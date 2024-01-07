import 'dotenv/config'
import {JimpClient} from "./lib/jimp/JimpClient"
import {FlickrClient} from "./lib/flickr/FlickrClient"

(async function () {
    const flickrClient = new FlickrClient(process.env.FLICKR_API_KEY)
    const flickrImageId = process.env.FLICKR_IMAGE_ID

    flickrClient.selectPhoto(flickrImageId)
    await flickrClient.downloadOriginalImage('./data/raw', `${flickrImageId}.jpg`)

    const jimpClient = new JimpClient()
    await jimpClient.setPhoto(`./data/raw/${flickrImageId}.jpg`)
    jimpClient.setAspectRatio(1.5)
    const title = await flickrClient.getImageTitle() + ' » ' + process.env.CUSTOM_TEXT + ' « ' + flickrImageId
    await jimpClient.setTextBox(title, 8)
    await jimpClient.saveProcessedImage('./data/processed', `${flickrImageId}.jpg`)
})()
