import "dotenv/config"
import {JimpClient} from "./lib/jimp/JimpClient"
import {FlickrClient} from "./lib/flickr/FlickrClient"

(async function () {
    // 1. downloading the image file from Flickr and storing it locally
    const flickrClient = new FlickrClient(process.env.FLICKR_API_KEY)
    const flickrImageId = process.env.FLICKR_IMAGE_ID
    flickrClient.selectPhoto(flickrImageId)
    await flickrClient.downloadOriginalImage('./data/original', `${flickrImageId}.jpg`)

    // 2. resizing the photo (so it matches the postcard format) and printing some meta information on it
    const jimpClient = new JimpClient()
    await jimpClient.setPhoto(`./data/original/${flickrImageId}.jpg`)
    jimpClient.setAspectRatio(1.5)
    jimpClient.setMargin(2)
    const title = await flickrClient.getImageTitle() + ' » ' + process.env.CUSTOM_TEXT + ' « ' + flickrImageId
    await jimpClient.setTextBox(title, 8)

    // 3. saving the modified photo
    await jimpClient.saveProcessedImage('./data/processed', `${flickrImageId}.jpg`)
})()
