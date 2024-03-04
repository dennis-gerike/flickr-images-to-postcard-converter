import "dotenv/config"
import axios from "axios"
import {FlickrClient} from "./lib/flickr/FlickrClient"
import {downloadPhotos} from "./lib/converter/downloadPhotos"
import {convertPhotos} from "./lib/converter/convertPhotos"
import {determineToBeProcessedPhotos} from "./lib/converter/determineToBeProcessedPhotos"
import {EnvironmentVariables} from "./lib/converter/types/EnvironmentVariables"

(async function () {
    const flickrClient = new FlickrClient(process.env[EnvironmentVariables.FLICKR_API_KEY] as string, axios)
    const photoIds = await determineToBeProcessedPhotos(flickrClient)
    await downloadPhotos(photoIds, flickrClient)
    await convertPhotos(photoIds)
})()
