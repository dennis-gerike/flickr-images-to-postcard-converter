import {FlickrClient} from "../flickr/FlickrClient"
import {getPhotoId} from "./getPhotoId"
import {getAlbumId} from "./getAlbumId"

export async function determineToBeProcessedPhotos(): Promise<string[]> {
    const photoId = getPhotoId()
    if (photoId !== null) {
        return [photoId]
    }

    const albumId = getAlbumId()
    if (albumId !== null) {
        const flickrClient = new FlickrClient(process.env.FLICKR_API_KEY as string)
        return await flickrClient.getAlbumImageIds(albumId)
    }

    return []
}
