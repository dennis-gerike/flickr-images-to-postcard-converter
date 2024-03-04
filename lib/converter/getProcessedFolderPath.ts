import {getAlbumId} from "./getAlbumId"
import {EnvironmentVariables} from "./types/EnvironmentVariables"

/**
 * A folder is needed to store the processed images.
 * Either the user specifies a path or we do.
 */
export function getProcessedFolderPath() {
    const path = process.env[EnvironmentVariables.PROCESSED_PATH]
    if (path) {
        return path
    }

    return `${__dirname}/../../data/processed/${getAlbumId()}`
}
