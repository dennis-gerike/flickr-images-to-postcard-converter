import axios from "axios"
import axiosRetry from "axios-retry"
import {GetPhotosResponse} from "../types/flickrApi/photoSet/GetPhotosResponse"

const FLICKR_API_BASE_URL = "https://api.flickr.com/services/rest/"

/**
 * Calls the Flickr API to request information about the given album.
 */
export async function fetchAlbumInformation(
    albumId: string,
    flickrApiKey: string,
    httpClient: typeof axios = axios
): Promise<GetPhotosResponse> {
    const requestOptions = {
        'headers': {
            'User-Agent': 'FlickrPhotosToPostcardConverter/1.0',
        },
        'params': {
            'api_key': flickrApiKey,
            'photoset_id': albumId,
            'format': 'json',
            'nojsoncallback': '?',
            'method': 'flickr.photosets.getPhotos',
        }
    }

    axiosRetry(httpClient, {
        retries: 5,
        retryDelay: axiosRetry.exponentialDelay
    })

    const response = await httpClient
        .get(FLICKR_API_BASE_URL, requestOptions)
        .catch(function (error) {
            throw new Error(`Fetching information for the flickr album "${albumId}" failed. [Error code: ${error.response.status}]`)
        })

    return response.data
}
