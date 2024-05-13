import {EnvironmentVariables} from "../../EnvironmentVariables"
import {determineProcessedFolderPath} from "../../../lib/converter/determineProcessedFolderPath"
import path from "node:path"

/**
 * @group unit
 */
describe('Processed Directory', () => {
    describe('Parsing configuration', () => {
        test('When no folder was configured then the default path should be determined', () => {
            const mediaId = "DUMMY_ID"
            delete process.env[EnvironmentVariables.PROCESSED_PATH]
            const determinedFolderPath = determineProcessedFolderPath(mediaId)

            expect(determinedFolderPath)
                .toEqual(path.resolve(`${__dirname}/../../../data/processed/${mediaId}`))
        })

        test('When an empty folder name was provided then the default path should be determined', () => {
            const mediaId = "DUMMY_ID"
            process.env[EnvironmentVariables.PROCESSED_PATH] = ""
            const determinedFolderPath = determineProcessedFolderPath(mediaId)

            expect(determinedFolderPath)
                .toEqual(path.resolve(`${__dirname}/../../../data/processed/${mediaId}`))
        })

        test('A valid folder name should be determined correctly', () => {
            const mediaId = "DUMMY_ID"
            process.env[EnvironmentVariables.PROCESSED_PATH] = "/home/test/tmp/flickr/albums/"
            const determinedFolderPath = determineProcessedFolderPath(mediaId)

            expect(determinedFolderPath)
                .toEqual(`/home/test/tmp/flickr/albums/${mediaId}`)
        })

        test('Relative folder paths should be resolved correctly', () => {
            const mediaId = "DUMMY_ID"
            process.env[EnvironmentVariables.PROCESSED_PATH] = "/home/test/tmp/flickr/misc/../albums/"
            const determinedFolderPath = determineProcessedFolderPath(mediaId)

            expect(determinedFolderPath)
                .toEqual(`/home/test/tmp/flickr/albums/${mediaId}`)
        })
    })
})
