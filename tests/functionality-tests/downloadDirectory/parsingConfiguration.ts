import {EnvironmentVariables} from "../../EnvironmentVariables"
import {determineDownloadFolderPath} from "../../../lib/converter/determineDownloadFolderPath"
import path from "node:path"

/**
 * @group unit
 */
describe('Download Directory', () => {
    describe('Parsing configuration', () => {
        test('When no folder was configured then the default path should be determined', () => {
            delete process.env[EnvironmentVariables.DOWNLOAD_PATH]
            const determinedFolderPath = determineDownloadFolderPath()

            expect(determinedFolderPath)
                .toEqual(path.resolve(`${__dirname}/../../../data/original/null`))
        })

        test('When an empty folder name was provided then the default path should be determined', () => {
            process.env[EnvironmentVariables.DOWNLOAD_PATH] = ""
            const determinedFolderPath = determineDownloadFolderPath()

            expect(determinedFolderPath)
                .toEqual(path.resolve(`${__dirname}/../../../data/original/null`))
        })

        test('A valid folder name should be determined correctly', () => {
            process.env[EnvironmentVariables.DOWNLOAD_PATH] = "/home/test/tmp/flickr/albums/"
            const determinedFolderPath = determineDownloadFolderPath()

            expect(determinedFolderPath)
                .toEqual("/home/test/tmp/flickr/albums")
        })

        test('Relative folder paths should be resolved correctly', () => {
            process.env[EnvironmentVariables.DOWNLOAD_PATH] = "/home/test/tmp/flickr/misc/../albums/"
            const determinedFolderPath = determineDownloadFolderPath()

            expect(determinedFolderPath)
                .toEqual("/home/test/tmp/flickr/albums")
        })
    })
})
