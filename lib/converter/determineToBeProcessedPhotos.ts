import {FlickrClient} from "../flickr/FlickrClient"
import {getPhotoId} from "./getPhotoId"
import {getAlbumId} from "./getAlbumId"

export async function determineToBeProcessedPhotos(flickrClient: FlickrClient): Promise<string[]> {
    const photoId = getPhotoId()
    if (photoId !== null) {
        return [photoId]
    }

    const albumId = getAlbumId()
    if (albumId !== null) {
        return await flickrClient.getAlbumImageIds(albumId)
    }

    return []
}
