import {ImageInformation} from "../flickr/types/internal/ImageInformation"

export function resolvePlaceholdersInCaption(templateText: string, imageInformation: ImageInformation) {
    return templateText
        .replace('<PHOTO_ID>', imageInformation.id)
}
