/**
 * Calls the Flickr API to request the available image sizes for a given photo.
 */
import axios from "axios"
import axiosRetry from "axios-retry"
import {GetSizesResponse} from "../types/flickrApi/photos/GetSizesResponse"

const FLICKR_API_BASE_URL = "https://api.flickr.com/services/rest/"

export async function fetchImageSizes(
    imageId: string,
    flickrApiKey: string,
    httpClient: typeof axios = axios
): Promise<GetSizesResponse> {
    const requestOptions = {
        'headers': {
            'User-Agent': 'FlickrPhotosToPostcardConverter/1.0',
        },
        'params': {
            'api_key': flickrApiKey,
            'photo_id': imageId,
            'format': 'json',
            'nojsoncallback': '?',
            'method': 'flickr.photos.getSizes',
        }
    }

    axiosRetry(httpClient, {
        retries: 5,
        retryDelay: axiosRetry.exponentialDelay
    })

    const response = await httpClient
        .get(FLICKR_API_BASE_URL, requestOptions)
        .catch(function (error) {
            throw new Error(`Fetching the image sizes for the flickr photo "${imageId}" failed. [Error code: ${error.response.status}]`)
        })

    return response.data
}
