import {EnvironmentVariables} from "./types/EnvironmentVariables"

export function getPhotoId() {
    if (process.env[EnvironmentVariables.FLICKR_IMAGE_ID]) {
        return process.env[EnvironmentVariables.FLICKR_IMAGE_ID]
    }

    return null
}