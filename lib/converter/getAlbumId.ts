import {EnvironmentVariables} from "./types/EnvironmentVariables"

export function getAlbumId() {
    if (process.env[EnvironmentVariables.FLICKR_ALBUM_ID]) {
        return process.env[EnvironmentVariables.FLICKR_ALBUM_ID]
    }

    return null
}
