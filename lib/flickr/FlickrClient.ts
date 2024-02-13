import axios from 'axios'
import axiosRetry from "axios-retry"
import * as fs from "fs/promises"
import {GetInfoResponse} from "./types/flickrApi/photos/GetInfoResponse"
import {ImageInformation} from "./types/internal/ImageInformation"
import {GetSizesResponse} from "./types/flickrApi/photos/GetSizesResponse"
import {GetPhotosResponse} from "./types/flickrApi/photoSet/GetPhotosResponse"
import {Size} from "./types/flickrApi/photos/partials/Size"

const FLICKR_API_BASE_URL = "https://api.flickr.com/services/rest/"

/**
 * The Flickr client encapsulates every request to the Flickr API.
 * The caller has to provide a valid HTTP client (axios compatible).
 */
export class FlickrClient {
    private readonly flickrApiKey: string
    private readonly httpClient: typeof axios

    constructor(flickrApiKey: string, httpClient: typeof axios) {
        if (!flickrApiKey) {
            throw new Error('Flickr api key was not provided. Cannot continue.')
        } else {
            this.flickrApiKey = flickrApiKey
        }

        this.httpClient = httpClient
    }

    /**
     * Downloads the original image (not one of the resized versions) into the given folder.
     * If the folder doesn't exist, it will be created.
     */
    public async downloadOriginalImage(imageId: string, targetPath: string, targetFile: string) {
        await fs.mkdir(`${targetPath}/`, {recursive: true})

        const originalImage = await this.getOriginalImage(imageId)
        if (!originalImage) {
            console.warn(`Could not find original image for ID ${imageId}`)
            return
        }

        const response = await this.httpClient.get(originalImage.source, {responseType: 'arraybuffer'})
        const image = Buffer.from(response.data, 'binary')

        await fs.writeFile(`${targetPath}/${targetFile}`, image)
    }

    /**
     * Downloads meta information for the given image.
     */
    public async downloadImageInformation(imageId: string, targetPath: string, targetFile: string) {
        await fs.mkdir(`${targetPath}/`, {recursive: true})

        const rawImageInformation = await this.fetchImageInformation(imageId)
        const imageInformation: ImageInformation = {
            id: rawImageInformation.photo.id,
            url: rawImageInformation.photo.urls.url[0]._content,
            title: rawImageInformation.photo.title._content,
        }

        await fs.writeFile(`${targetPath}/${targetFile}`, JSON.stringify(imageInformation, null, 2))
    }

    /**
     * Returns a list of all photo ids that belong to the given album.
     */
    public async getAlbumImageIds(albumId: string) {
        const rawAlbumInformation = await this.fetchAlbumInformation(albumId)

        return rawAlbumInformation.photoset.photo.map(photo => photo.id)
    }

    /**
     * Returns some basic information about the original image (e.g. dimensions and url).
     */
    private async getOriginalImage(imageId: string): Promise<Size | undefined> {
        const imageSizes = await this.fetchImageSizes(imageId)

        return imageSizes.sizes.size.find((item: Size) => {
            return item.label === 'Original'
        })
    }

    /**
     * Calls the Flickr API to request information about the given album.
     */
    private async fetchAlbumInformation(albumId: string): Promise<GetPhotosResponse> {
        const requestOptions = {
            'params': {
                'api_key': this.flickrApiKey,
                'photoset_id': albumId,
                'format': 'json',
                'nojsoncallback': '?',
                'method': 'flickr.photosets.getPhotos',
            }
        }

        let response = await this.httpClient.get(FLICKR_API_BASE_URL, requestOptions)
        axiosRetry(this.httpClient, {retries: 5, retryDelay: axiosRetry.exponentialDelay})

        return <GetPhotosResponse>response.data
    }

    /**
     * Calls the Flickr API to request information about the given photo.
     */
    private async fetchImageInformation(imageId: string): Promise<GetInfoResponse> {
        const requestOptions = {
            'params': {
                'api_key': this.flickrApiKey,
                'photo_id': imageId,
                'format': 'json',
                'nojsoncallback': '?',
                'method': 'flickr.photos.getInfo',
            }
        }

        let response = await this.httpClient.get(FLICKR_API_BASE_URL, requestOptions)
        axiosRetry(this.httpClient, {retries: 5, retryDelay: axiosRetry.exponentialDelay})

        return <GetInfoResponse>response.data
    }

    /**
     * Calls the Flickr API to request the available image sizes for a given photo.
     */
    private async fetchImageSizes(imageId: string): Promise<GetSizesResponse> {
        const requestOptions = {
            'params': {
                'api_key': this.flickrApiKey,
                'photo_id': imageId,
                'format': 'json',
                'nojsoncallback': '?',
                'method': 'flickr.photos.getSizes',
            }
        }

        let response = await this.httpClient.get(FLICKR_API_BASE_URL, requestOptions)
        axiosRetry(this.httpClient, {retries: 5, retryDelay: axiosRetry.exponentialDelay})

        return <GetSizesResponse>response.data
    }
}
