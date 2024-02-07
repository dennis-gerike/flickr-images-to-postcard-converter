import {getAlbumId} from "./getAlbumId"

/**
 * A folder is needed to store the processed images.
 * Either the user specifies a path or we do.
 */
export function getProcessedFolderPath() {
    const path = process.env.PROCESSED_PATH
    if (path) {
        return path
    }

    return `${__dirname}/../../data/processed/${getAlbumId()}`
}
