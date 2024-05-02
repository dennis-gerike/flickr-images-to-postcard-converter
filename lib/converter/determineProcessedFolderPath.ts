import * as path from "node:path"
import {determineAlbumId} from "./determineAlbumId"
import {EnvironmentVariables} from "./types/EnvironmentVariables"

/**
 * A disk folder is needed to store the processed images.
 * The user can specify s custom folder, otherwise the default folder will be used.
 */
export function determineProcessedFolderPath() {
    const defaultFolderPath = path.resolve(`${__dirname}/../../data/processed/${determineAlbumId()}`)
    const userDefinedFolderPath = process.env[EnvironmentVariables.PROCESSED_PATH]

    if (typeof userDefinedFolderPath === "undefined" || userDefinedFolderPath === "") {
        return defaultFolderPath
    }

    return path.resolve(userDefinedFolderPath)
}
