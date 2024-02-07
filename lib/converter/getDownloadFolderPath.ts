import {getAlbumId} from "./getAlbumId";

/**
 * A folder is needed to store the downloaded images.
 * Either the user specifies a path or we do.
 */
export function getDownloadFolderPath() {
    const path = process.env.DOWNLOAD_PATH
    if (path) {
        return path
    }

    return `${__dirname}/../../data/original/${getAlbumId()}`
}
