import {getAlbumId} from "./getAlbumId"

export function getProcessedFolderPath() {
    return `${__dirname}/../../data/processed/${getAlbumId()}`
}
