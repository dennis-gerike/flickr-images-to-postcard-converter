import {EnvironmentVariables} from "./types/EnvironmentVariables"

export function determinePhotoId() {
    const defaultPhotoId = null
    const userDefinedPhotoId = process.env[EnvironmentVariables.FLICKR_IMAGE_ID]

    if (typeof userDefinedPhotoId === "undefined" || userDefinedPhotoId === "") {
        return defaultPhotoId
    }

    return userDefinedPhotoId
}
