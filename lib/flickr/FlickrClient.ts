import axios from 'axios'
import {FlickrPhotoTitleInformation} from "./types/FlickrPhotoTitleInformation"
import {FlickrImageSize} from "./types/FlickrImageSize"
import * as fs from "fs/promises"
import {FlickrPhotoSet} from "./types/FlickrPhotoSet"

const FLICKR_API_BASE_URL = "https://api.flickr.com/services/rest/"

/**
 * The Flickr client encapsulates every request to the Flickr API.
 * The client can handle one image at a time.
 * A call to selectPhoto() always needs to be the first interaction with the client.
 */
export class FlickrClient {
    private readonly flickrApiKey: string

    constructor(flickrApiKey: string | undefined) {
        if (!flickrApiKey) {
            throw new Error('Flickr api key was not provided. Cannot continue.')
        }

        this.flickrApiKey = flickrApiKey
    }

    /**
     * Returns the title of the Flickr image.
     * When the image has no title, then an empty string will be returned.
     */
    public async getImageTitle(imageId: string) {
        const imageInformation = await this.fetchImageInformation(imageId)
        const photoTitle: FlickrPhotoTitleInformation = imageInformation.photo.title

        return photoTitle._content
    }

    /**
     * Downloads the original image (not one of the resized versions) into the given folder.
     * If the folder doesn't exist, it will be created.
     */
    public async downloadOriginalImage(imageId: string, targetPath: string, targetFile: string) {
        await fs.mkdir(`${targetPath}/`, {recursive: true})

        const originalImage = await this.getOriginalImage(imageId)
        const response = await axios.get(originalImage.source, {responseType: 'arraybuffer'})
        const image = Buffer.from(response.data, 'binary')

        await fs.writeFile(`${targetPath}/${targetFile}`, image)
    }

    public async getAlbumImageIds(albumId: string) {
        const albumInformation = await this.fetchAlbumInformation(albumId)

        return albumInformation.photoset.photo.map(photo => photo.id)
    }

    /**
     * Returns some basic information about the original image (e.g. dimensions and url).
     */
    public async getOriginalImage(imageId: string): Promise<FlickrImageSize> {
        const imageSizes = await this.fetchImageSizes(imageId)

        return imageSizes.sizes.size.find((item: FlickrImageSize) => {
            return item.label === 'Original'
        })
    }

    private async fetchAlbumInformation(albumId: string): Promise<FlickrPhotoSet> {
        const requestOptions = {
            'method': 'get',
            'url': FLICKR_API_BASE_URL,
            'params': {
                'api_key': this.flickrApiKey,
                'photoset_id': albumId,
                'format': 'json',
                'nojsoncallback': '?',
                'method': 'flickr.photosets.getPhotos',
            }
        }

        let response = await axios(requestOptions)

        return response.data
    }

    /**
     * Requests meta information like author, title, description or tags for the currently selected photo.
     */
    private async fetchImageInformation(imageId: string) {
        const requestOptions = {
            'method': 'get',
            'url': FLICKR_API_BASE_URL,
            'params': {
                'api_key': this.flickrApiKey,
                'photo_id': imageId,
                'format': 'json',
                'nojsoncallback': '?',
                'method': 'flickr.photos.getInfo',
            }
        }

        let response = await axios(requestOptions)

        return response.data
    }

    private async fetchImageSizes(imageId: string) {
        const requestOptions = {
            'method': 'get',
            'url': FLICKR_API_BASE_URL,
            'params': {
                'api_key': this.flickrApiKey,
                'photo_id': imageId,
                'format': 'json',
                'nojsoncallback': '?',
                'method': 'flickr.photos.getSizes',
            }
        }

        let response = await axios(requestOptions)

        return response.data
    }
}
