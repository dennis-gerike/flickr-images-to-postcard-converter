import {FlickrClient} from "../flickr/FlickrClient"
import {SourceTypes} from "./types/SourceTypes"
import {determineSourceType} from "./determineSourceType"
import {determineMediaId} from "./determineMediaId"

export async function determineToBeProcessedPhotos(flickrClient: FlickrClient): Promise<string[]> {
    const mediaId = determineMediaId()
    if (mediaId === null) {
        throw new Error('Source ID missing!')
    }

    switch (determineSourceType()) {
        default:
        case SourceTypes.FLICKR_PHOTO:
            return [mediaId]
        case SourceTypes.FLICKR_ALBUM:
            return await flickrClient.getAlbumImageIds(mediaId)
    }
}
