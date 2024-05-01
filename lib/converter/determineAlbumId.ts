import {EnvironmentVariables} from "./types/EnvironmentVariables"

export function determineAlbumId() {
    const defaultAlbumId = null
    const userDefinedAlbumId = process.env[EnvironmentVariables.FLICKR_ALBUM_ID]

    if (typeof userDefinedAlbumId === "undefined" || userDefinedAlbumId === "") {
        return defaultAlbumId
    }

    return userDefinedAlbumId
}
