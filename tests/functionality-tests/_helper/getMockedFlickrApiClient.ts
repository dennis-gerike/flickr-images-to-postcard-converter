import fs from "fs"
import axios from "axios"
import {getFixturesFolderPath} from "./getFixturesFolderPath"

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

export enum TestSituation {
    'success' = 'success',
    'failure' = 'failure'
}

export function getMockedFlickrApiClient(situation: TestSituation = TestSituation.success) {
    mockedAxios.get.mockImplementation((url, config): Promise<unknown> => {
        // Call to the Flickr REST API?
        if (url.startsWith('https://api.flickr.com/')) {
            if (config !== undefined) {
                switch (config.params.method) {
                    case 'flickr.photos.getInfo': {
                        const data = {data: require(`${getFixturesFolderPath()}/api-responses/${situation}/flickr.photos.getInfo`)}
                        return situation === TestSituation.success ? Promise.resolve(data) : Promise.reject(data)
                    }
                    case 'flickr.photos.getSizes': {
                        const data = {data: require(`${getFixturesFolderPath()}/api-responses/${situation}/flickr.photos.getSizes`)}
                        return situation === TestSituation.success ? Promise.resolve(data) : Promise.reject(data)
                    }
                    case 'flickr.photosets.getPhotos': {
                        const data = {data: require(`${getFixturesFolderPath()}/api-responses/${situation}/flickr.photosets.getPhotos`)}
                        return situation === TestSituation.success ? Promise.resolve(data) : Promise.reject(data)
                    }
                }
            }
        }

        // Attempt to download a Flickr photo?
        if (url.startsWith('https://live.staticflickr.com/')) {
            const binary = fs.readFileSync(`${getFixturesFolderPath()}/16by9_medium.jpg`)
            return Promise.resolve({
                data: binary
            })
        }

        // Unknown request
        return Promise.resolve({
            data: {}
        })
    })

    return mockedAxios
}
