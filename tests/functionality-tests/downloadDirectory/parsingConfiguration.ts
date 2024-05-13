import {EnvironmentVariables} from "../../EnvironmentVariables"
import {determineDownloadFolderPath} from "../../../lib/converter/determineDownloadFolderPath"
import path from "node:path"

/**
 * @group unit
 */
describe('Download Directory', () => {
    describe('Parsing configuration', () => {
        test('When no folder was configured then the default path should be determined', () => {
            const mediaId = "DUMMY_ID"
            delete process.env[EnvironmentVariables.DOWNLOAD_PATH]
            const determinedFolderPath = determineDownloadFolderPath(mediaId)

            expect(determinedFolderPath)
                .toEqual(path.resolve(`${__dirname}/../../../data/original/${mediaId}`))
        })

        test('When an empty folder name was provided then the default path should be determined', () => {
            const mediaId = "DUMMY_ID"
            process.env[EnvironmentVariables.DOWNLOAD_PATH] = ""
            const determinedFolderPath = determineDownloadFolderPath(mediaId)

            expect(determinedFolderPath)
                .toEqual(path.resolve(`${__dirname}/../../../data/original/${mediaId}`))
        })

        test('A valid folder name should be determined correctly', () => {
            const mediaId = "DUMMY_ID"
            process.env[EnvironmentVariables.DOWNLOAD_PATH] = "/home/test/tmp/flickr/albums/"
            const determinedFolderPath = determineDownloadFolderPath(mediaId)

            expect(determinedFolderPath)
                .toEqual(`/home/test/tmp/flickr/albums/${mediaId}`)
        })

        test('Relative folder paths should be resolved correctly', () => {
            const mediaId = "DUMMY_ID"
            process.env[EnvironmentVariables.DOWNLOAD_PATH] = "/home/test/tmp/flickr/misc/../albums/"
            const determinedFolderPath = determineDownloadFolderPath(mediaId)

            expect(determinedFolderPath)
                .toEqual(`/home/test/tmp/flickr/albums/${mediaId}`)
        })
    })
})
