import {JimpClient} from "../jimp/JimpClient"
import {ImageInformation} from "../flickr/types/internal/ImageInformation"
import {getDownloadFolderPath} from "./getDownloadFolderPath"
import {determineImageFileName} from "./determineImageFileName"
import {determineMetaInformationFileName} from "./determineMetaInformationFileName"
import {getProcessedFolderPath} from "./getProcessedFolderPath"
import {determineTextColor} from "./determineTextColor"
import {determineAspectRatio} from "./determineAspectRatio"
import {resolvePlaceholdersInCaption} from "./resolvePlaceholdersInCaption"
import {EnvironmentVariables} from "./types/EnvironmentVariables"

export async function convertPhotos(photoIds: string[]) {
    const cliProgress = require('cli-progress')
    const progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.rect)
    const jimpClient = new JimpClient()

    // resizing the photos to match the postcard format, then adding a label and finally a nice margin
    console.log('Converting photos')
    progressBar.start(photoIds.length, 0)
    for (const photoId of photoIds) {
        await jimpClient.setPhoto(`${getDownloadFolderPath()}/${determineImageFileName(photoId)}`)
        jimpClient.setAspectRatio(determineAspectRatio())
        const photoInformation = require(`${getDownloadFolderPath()}/${determineMetaInformationFileName(photoId)}`) as ImageInformation
        const title = resolvePlaceholdersInCaption(process.env[EnvironmentVariables.CUSTOM_TEXT] ?? "", photoInformation)
        const textColor = determineTextColor()
        const textVerticalBuffer = Number(process.env[EnvironmentVariables.TEXT_VERTICAL_BUFFER] ?? 0)
        jimpClient.setCaption({
            text: title,
            relativeHeight: 5,
            red: textColor.red,
            green: textColor.green,
            blue: textColor.blue,
            relativeVerticalBuffer: textVerticalBuffer,
        })
        jimpClient.setMargin(Number(process.env[EnvironmentVariables.MARGIN_HORIZONTAL] ?? 0), Number(process.env[EnvironmentVariables.MARGIN_VERTICAL] ?? 0))
        await jimpClient.saveProcessedImage(getProcessedFolderPath(), determineImageFileName(photoId))
        jimpClient.resetCanvas()

        progressBar.increment()
    }
    progressBar.stop()
}
