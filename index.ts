import {FlickrClient} from "./lib/flickr/FlickrClient"

(async function () {
    const flickrClient = new FlickrClient(process.env.FLICKR_API_KEY)
    flickrClient.setContext(process.env.FLICKR_IMAGE_ID)
    console.log(await flickrClient.getImageTitle())
    console.log(await flickrClient.getOriginalImageWidthInPixel())
    console.log(await flickrClient.getOriginalImageHeightInPixel())
    await flickrClient.downloadOriginalImage('./data/raw')
})()
