import "dotenv/config"
import {downloadPhotos} from "./lib/converter/downloadPhotos"
import {convertPhotos} from "./lib/converter/convertPhotos"
import {determineToBeProcessedPhotos} from "./lib/converter/determineToBeProcessedPhotos"

(async function () {
    const photoIds = await determineToBeProcessedPhotos()
    await downloadPhotos(photoIds)
    await convertPhotos(photoIds)
})()
