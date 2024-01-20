import {getAlbumId} from "./getAlbumId"

export function getDownloadFolderPath() {
    return `${__dirname}/../../data/original/${getAlbumId()}`
}
