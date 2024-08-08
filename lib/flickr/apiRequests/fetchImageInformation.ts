import axios from "axios"
import axiosRetry from "axios-retry"
import {GetInfoResponse} from "../types/flickrApi/photos/GetInfoResponse"
import {ApiError} from "../types/internal/ApiError"

const FLICKR_API_BASE_URL = "https://api.flickr.com/services/rest/"

/**
 * Calls the Flickr API to request information about the given photo.
 */
export async function fetchImageInformation(
    imageId: string,
    flickrApiKey: string,
    httpClient: typeof axios = axios
): Promise<GetInfoResponse> {
    const requestOptions = {
        'headers': {
            'User-Agent': 'FlickrPhotosToPostcardConverter/1.0',
        },
        'params': {
            'api_key': flickrApiKey,
            'photo_id': imageId,
            'format': 'json',
            'nojsoncallback': '?',
            'method': 'flickr.photos.getInfo',
        }
    }

    axiosRetry(httpClient, {
        retries: 5,
        retryDelay: axiosRetry.exponentialDelay
    })

    const response = await httpClient
        .get(FLICKR_API_BASE_URL, requestOptions)
        .catch(() => {
            throw new ApiError(`Fetching information for the flickr photo "${imageId}" failed.`)
        })

    return response.data
}
