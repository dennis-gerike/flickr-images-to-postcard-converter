import 'dotenv/config'
import axios from 'axios'
import {FlickrPhotoTitleInformation} from "../../types/FlickrPhotoTitleInformation";

const FLICKR_API_BASE_URL = "https://api.flickr.com/services/rest/"

/**
 * The Flickr client encapsulates every request to the Flickr API.
 * The client can handle one image at a time.
 * A call to setContext() always needs to be the first interaction with the client.
 */
export class FlickrClient {
    private readonly flickrApiKey: string
    private flickrImageId: string | undefined

    // FLICKR_API_KEY is expected in the environment variables
    constructor(flickrApiKey: string | undefined) {
        if (!flickrApiKey) {
            throw new Error('Flickr api key was not provided. Cannot continue.')
        }

        this.flickrApiKey = flickrApiKey
    }

    /**
     * Specify the flickr image that should be worked on in the following commands.
     * The client can (only) handle one image at a time.
     * Changing this context allows the caller to switch between different images.
     */
    public setContext(flickrImageId: string | undefined) {
        if (!flickrImageId) {
            throw new Error('Flickr image ID was not provided. Cannot continue.')
        }

        this.flickrImageId = flickrImageId
    }

    public async getImageTitle() {
        return await this.fetchImageInformation()
            .then(imageInformation => {
                const photoTitle: FlickrPhotoTitleInformation = imageInformation.photo.title
                return photoTitle._content
            })
    }

    /**
     * Requests meta information like author, title, description or tags for the selected image (see setContext()).
     */
    private async fetchImageInformation() {
        const requestOptions = {
            'method': 'get',
            'url': FLICKR_API_BASE_URL,
            'params': {
                'api_key': this.flickrApiKey,
                'format': 'json',
                'nojsoncallback': '?',
                'method': 'flickr.photos.getInfo',
                'photo_id': this.flickrImageId,
            }
        }

        let response = await axios(requestOptions)

        return response.data
    }
}
