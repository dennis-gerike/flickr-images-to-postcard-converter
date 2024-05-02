import path from "node:path"
import {determineAlbumId} from "./determineAlbumId"
import {EnvironmentVariables} from "./types/EnvironmentVariables"

/**
 * A disk folder is needed to store the downloaded photos.
 * The user can specify s custom folder, otherwise the default folder will be used.
 */
export function determineDownloadFolderPath() {
    const defaultFolderPath = path.resolve(`${__dirname}/../../data/original/${determineAlbumId()}`)
    const userDefinedFolderPath = process.env[EnvironmentVariables.DOWNLOAD_PATH]

    if (typeof userDefinedFolderPath === "undefined" || userDefinedFolderPath === "") {
        return defaultFolderPath
    }

    return path.resolve(userDefinedFolderPath)
}
