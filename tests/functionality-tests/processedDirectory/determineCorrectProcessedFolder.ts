import * as path from "node:path"
import {EnvironmentVariables} from "../../../lib/converter/types/EnvironmentVariables"
import {determineProcessedFolderPath} from "../../../lib/converter/determineProcessedFolderPath"

test('when no folder was configured then the default path should be determined', () => {
    delete process.env[EnvironmentVariables.PROCESSED_PATH]
    const determinedFolderPath = determineProcessedFolderPath()

    expect(determinedFolderPath)
        .toEqual(path.resolve(`${__dirname}/../../../data/processed/null`))
})

test('when the provided folder path is empty then the default path should be determined', () => {
    process.env[EnvironmentVariables.PROCESSED_PATH] = ""
    const determinedFolderPath = determineProcessedFolderPath()

    expect(determinedFolderPath)
        .toEqual(path.resolve(`${__dirname}/../../../data/processed/null`))
})

test('a valid folder path should be determined correctly', () => {
    process.env[EnvironmentVariables.PROCESSED_PATH] = "/home/test/tmp/flickr/albums/"
    const determinedFolderPath = determineProcessedFolderPath()

    expect(determinedFolderPath)
        .toEqual("/home/test/tmp/flickr/albums")
})

test('folder paths should be resolved correctly', () => {
    process.env[EnvironmentVariables.PROCESSED_PATH] = "/home/test/tmp/flickr/misc/../albums/"
    const determinedFolderPath = determineProcessedFolderPath()

    expect(determinedFolderPath)
        .toEqual("/home/test/tmp/flickr/albums")
})
