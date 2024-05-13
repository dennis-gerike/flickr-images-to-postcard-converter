import path from "node:path"
import {EnvironmentVariables} from "./types/EnvironmentVariables"

/**
 * A disk folder is needed to store the downloaded photos.
 * The user can specify s custom folder, otherwise the default folder will be used.
 */
export function determineDownloadFolderPath(mediaId: string) {
    const defaultFolderPath = path.resolve(`${__dirname}/../../data/original/${mediaId}`)
    const userDefinedFolderPath = process.env[EnvironmentVariables.DOWNLOAD_PATH]

    if (typeof userDefinedFolderPath === "undefined" || userDefinedFolderPath === "") {
        return defaultFolderPath
    }

    return path.resolve(`${userDefinedFolderPath}/${mediaId}`)
}
