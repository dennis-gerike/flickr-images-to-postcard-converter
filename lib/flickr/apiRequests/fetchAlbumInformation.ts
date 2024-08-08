import axios from "axios"
import axiosRetry from "axios-retry"
import {GetPhotosResponse} from "../types/flickrApi/photoSet/GetPhotosResponse"
import {ApiError} from "../types/internal/ApiError"
import {standardHeaders} from "./standardHeaders"
import {standardParams} from "./standardParams"

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
        'headers': standardHeaders,
        'params': {
            ...standardParams,
            'api_key': flickrApiKey,
            'photoset_id': albumId,
            'method': 'flickr.photosets.getPhotos',
        }
    }

    axiosRetry(httpClient, {
        retries: 5,
        retryDelay: axiosRetry.exponentialDelay
    })

    const response = await httpClient
        .get(FLICKR_API_BASE_URL, requestOptions)
        .catch(() => {
            throw new ApiError(`Fetching information for the flickr album "${albumId}" failed.`)
        })

    return response.data
}
