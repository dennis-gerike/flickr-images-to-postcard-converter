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
        if (url.startsWith('https://api.flickr.com/')) {
            if (config !== undefined) {
                switch (config.params.method) {
                    case 'flickr.photos.getInfo':
                        return Promise.resolve({
                            data: require(`${getFixturesFolderPath()}/api-responses/${situation}/flickr.photos.getInfo`)
                        })
                    case 'flickr.photos.getSizes':
                        return Promise.resolve({
                            data: require(`${getFixturesFolderPath()}/api-responses/${situation}/flickr.photos.getSizes`)
                        })
                    case 'flickr.photosets.getPhotos':
                        return Promise.resolve({
                            data: require(`${getFixturesFolderPath()}/api-responses/${situation}/flickr.photosets.getPhotos`)
                        })
                }
            }
        }

        if (url.startsWith('https://live.staticflickr.com/')) {
            const binary = fs.readFileSync(`${getFixturesFolderPath()}/16by9_medium.jpg`)
            return Promise.resolve({
                data: binary
            })
        }

        return Promise.resolve({
            data: {}
        })
    })

    return mockedAxios
}
