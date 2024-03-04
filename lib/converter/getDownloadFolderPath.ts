import {getAlbumId} from "./getAlbumId";
import {EnvironmentVariables} from "./types/EnvironmentVariables"

/**
 * A folder is needed to store the downloaded images.
 * Either the user specifies a path or we do.
 */
export function getDownloadFolderPath() {
    const path = process.env[EnvironmentVariables.DOWNLOAD_PATH]
    if (path) {
        return path
    }

    return `${__dirname}/../../data/original/${getAlbumId()}`
}
