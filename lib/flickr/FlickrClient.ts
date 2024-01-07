import axios from 'axios'
import {FlickrPhotoTitleInformation} from "../../types/FlickrPhotoTitleInformation"
import {FlickrImageSize} from "../../types/FlickrImageSize"
import * as fs from "fs/promises"

const FLICKR_API_BASE_URL = "https://api.flickr.com/services/rest/"

/**
 * The Flickr client encapsulates every request to the Flickr API.
 * The client can handle one image at a time.
 * A call to setContext() always needs to be the first interaction with the client.
 */
export class FlickrClient {
    private readonly flickrApiKey: string
    private flickrImageId: string | undefined

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

    /**
     * Returns the title of the Flickr image.
     * When the image has no title, then an empty string will be returned.
     */
    public async getImageTitle() {
        const imageInformation = await this.fetchImageInformation()
        const photoTitle: FlickrPhotoTitleInformation = imageInformation.photo.title

        return photoTitle._content
    }

    public async getOriginalImageWidthInPixel() {
        const originalImage = await this.getOriginalImage()

        return originalImage.width
    }

    public async getOriginalImageHeightInPixel() {
        const originalImage = await this.getOriginalImage()

        return originalImage.height
    }

    /**
     * Downloads the original image (not one of the resized versions) into the given folder.
     * If the folder doesn't exist, it will be created.
     */
    public async downloadOriginalImage(targetPath: string, targetFile: string) {
        await fs.mkdir(`${targetPath}/`, {recursive: true})

        const originalImage = await this.getOriginalImage()
        const response = await axios.get(originalImage.source, {responseType: 'arraybuffer'})
        const image = Buffer.from(response.data, 'binary')

        await fs.writeFile(`${targetPath}/${targetFile}`, image)
    }

    /**
     * Returns some basic information about the original image (e.g. dimensions and url).
     */
    public async getOriginalImage(): Promise<FlickrImageSize> {
        const imageSizes = await this.fetchImageSizes()

        return imageSizes.sizes.size.find((item: FlickrImageSize) => {
            return item.label === 'Original'
        })
    }

    /**
     * Requests meta information like author, title, description or tags for the currently selected image (see setContext()).
     */
    private async fetchImageInformation() {
        const requestOptions = {
            'method': 'get',
            'url': FLICKR_API_BASE_URL,
            'params': {
                'api_key': this.flickrApiKey,
                'photo_id': this.flickrImageId,
                'format': 'json',
                'nojsoncallback': '?',
                'method': 'flickr.photos.getInfo',
            }
        }

        let response = await axios(requestOptions)

        return response.data
    }

    private async fetchImageSizes() {
        const requestOptions = {
            'method': 'get',
            'url': FLICKR_API_BASE_URL,
            'params': {
                'api_key': this.flickrApiKey,
                'photo_id': this.flickrImageId,
                'format': 'json',
                'nojsoncallback': '?',
                'method': 'flickr.photos.getSizes',
            }
        }

        let response = await axios(requestOptions)

        return response.data
    }
}
