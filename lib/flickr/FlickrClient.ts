import axios from 'axios'
import * as fs from "fs/promises"
import {fetchImageInformation} from "./apiRequests/fetchImageInformation"
import {fetchImage} from "./apiRequests/fetchImage"
import {ImageInformation} from "./types/internal/ImageInformation"
import {fetchImageSizes} from "./apiRequests/fetchImageSizes"
import {fetchAlbumInformation} from "./apiRequests/fetchAlbumInformation"
import {Size} from "./types/flickrApi/photos/partials/Size"

/**
 * The Flickr client encapsulates every request to the Flickr API.
 * The caller has to provide a valid HTTP client that is "axios" compatible.
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
            throw new Error(`Could not find original image for ID ${imageId}`)
        }

        const image = await fetchImage(originalImage.source)
        await fs.writeFile(`${targetPath}/${targetFile}`, image)
    }

    /**
     * Get meta information for the given image.
     */
    public async getImageInformation(imageId: string): Promise<ImageInformation> {
        const rawImageInformation = await fetchImageInformation(imageId, this.flickrApiKey, this.httpClient)
        return {
            id: rawImageInformation.photo.id,
            url: rawImageInformation.photo.urls.url[0]._content,
            title: rawImageInformation.photo.title._content,
        }
    }

    /**
     * Gets meta information for the given image and downloads it to the specified folder.
     */
    public async downloadImageInformation(imageId: string, targetPath: string, targetFile: string) {
        await fs.mkdir(`${targetPath}/`, {recursive: true})
        const imageInformation = await this.getImageInformation(imageId)
        await fs.writeFile(`${targetPath}/${targetFile}`, JSON.stringify(imageInformation, null, 2))
    }

    /**
     * Returns a list of all photo ids that belong to the given album.
     */
    public async getAlbumImageIds(albumId: string) {
        const rawAlbumInformation = await fetchAlbumInformation(albumId, this.flickrApiKey, this.httpClient)

        return rawAlbumInformation.photoset.photo.map(photo => photo.id)
    }

    /**
     * Returns some basic information about the original image (e.g. dimensions and url).
     */
    private async getOriginalImage(imageId: string): Promise<Size | undefined> {
        const imageSizesResponse = await fetchImageSizes(imageId, this.flickrApiKey, this.httpClient)

        if (imageSizesResponse.stat === "fail") {
            return undefined
        }

        return imageSizesResponse.sizes.size.find((item: Size) => {
            return item.label === 'Original'
        })
    }
}
