import {JimpClient} from "../jimp/JimpClient"
import {ImageInformation} from "../flickr/types/internal/ImageInformation"
import {determineDownloadFolderPath} from "./determineDownloadFolderPath"
import {determineImageFileName} from "./determineImageFileName"
import {determineMetaInformationFileName} from "./determineMetaInformationFileName"
import {determineProcessedFolderPath} from "./determineProcessedFolderPath"
import {determineTextColor} from "./determineTextColor"
import {determineAspectRatio} from "./determineAspectRatio"
import {resolvePlaceholdersInCaption} from "./resolvePlaceholdersInCaption"
import {determineHorizontalMargin} from "./determineHorizontalMargin"
import {determineVerticalMargin} from "./determineVerticalMargin"
import {determineBuffer} from "./determineBuffer"
import {determineCaption} from "./determineCaption"

export async function convertPhotos(photoIds: string[]) {
    const cliProgress = require('cli-progress')
    const progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.rect)

    // resizing the photos to match the postcard format, then adding a label and finally a nice margin
    console.log('Converting photos')
    progressBar.start(photoIds.length, 0)
    for (const photoId of photoIds) {
        const jimpClient = new JimpClient()
        await jimpClient.setPhoto(`${determineDownloadFolderPath(photoId)}/${determineImageFileName(photoId)}`)
        jimpClient.setAspectRatio(determineAspectRatio())
        const photoInformation = require(`${determineDownloadFolderPath(photoId)}/${determineMetaInformationFileName(photoId)}`) as ImageInformation
        const title = resolvePlaceholdersInCaption(determineCaption(), photoInformation)
        const textColor = determineTextColor()
        const textVerticalBuffer = determineBuffer()
        jimpClient.setCaption({
            text: title,
            relativeHeight: 5,
            red: textColor.red,
            green: textColor.green,
            blue: textColor.blue,
            relativeVerticalBuffer: textVerticalBuffer,
        })
        jimpClient.setMargin(determineHorizontalMargin(), determineVerticalMargin())
        await jimpClient.saveProcessedImage(determineProcessedFolderPath(photoId), determineImageFileName(photoId))

        progressBar.increment()
    }
    progressBar.stop()
}
