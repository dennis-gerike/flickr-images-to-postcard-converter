import {FlickrClient} from "../flickr/FlickrClient"
import {determinePhotoId} from "./determinePhotoId"
import {determineAlbumId} from "./determineAlbumId"

export async function determineToBeProcessedPhotos(flickrClient: FlickrClient): Promise<string[]> {
    const photoId = determinePhotoId()
    if (photoId !== null) {
        return [photoId]
    }

    const albumId = determineAlbumId()
    if (albumId !== null) {
        return await flickrClient.getAlbumImageIds(albumId)
    }

    return []
}
