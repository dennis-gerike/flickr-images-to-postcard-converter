import axios from "axios"

/**
 * Downloads the photo from the given URL.
 */
export async function fetchImage(
    url: string,
    httpClient: typeof axios = axios
) {
    const response = await httpClient
        .get(url, {
            'responseType': 'arraybuffer',
            headers: {'User-Agent': 'FlickrPhotosToPostcardConverter/1.0'}
        })

    return Buffer.from(response.data, 'binary')
}
