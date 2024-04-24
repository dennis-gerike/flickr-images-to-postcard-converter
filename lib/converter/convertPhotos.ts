import {JimpClient} from "../jimp/JimpClient"
import {ImageInformation} from "../flickr/types/internal/ImageInformation"
import {getDownloadFolderPath} from "./getDownloadFolderPath"
import {getImageFileName} from "./getImageFileName"
import {getMetaInformationFileName} from "./getMetaInformationFileName"
import {getProcessedFolderPath} from "./getProcessedFolderPath"
import {getTextColor} from "./getTextColor"
import {getAspectRatio} from "./getAspectRatio"
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
        await jimpClient.setPhoto(`${getDownloadFolderPath()}/${getImageFileName(photoId)}`)
        const aspectRatio = getAspectRatio()
        if (typeof aspectRatio === "number") {
            jimpClient.setAspectRatio(aspectRatio)
        }
        const photoInformation = require(`${getDownloadFolderPath()}/${getMetaInformationFileName(photoId)}`) as ImageInformation
        const title = resolvePlaceholdersInCaption(process.env[EnvironmentVariables.CUSTOM_TEXT] ?? "", photoInformation)
        if (title !== "") {
            const textColor = getTextColor()
            const textVerticalBuffer = Number(process.env[EnvironmentVariables.TEXT_VERTICAL_BUFFER] ?? 0)
            jimpClient.setCaption({
                text: title,
                relativeHeight: 5,
                red: textColor.red,
                green: textColor.green,
                blue: textColor.blue,
                relativeVerticalBuffer: textVerticalBuffer,
            })
        }
        jimpClient.setMargin(Number(process.env[EnvironmentVariables.MARGIN_HORIZONTAL] ?? 0), Number(process.env[EnvironmentVariables.MARGIN_VERTICAL] ?? 0))
        await jimpClient.saveProcessedImage(getProcessedFolderPath(), getImageFileName(photoId))
        jimpClient.resetCanvas()

        progressBar.increment()
    }
    progressBar.stop()
}
