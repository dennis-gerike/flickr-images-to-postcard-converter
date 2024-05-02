import * as path from "node:path"
import {EnvironmentVariables} from "../../../lib/converter/types/EnvironmentVariables"
import {determineDownloadFolderPath} from "../../../lib/converter/determineDownloadFolderPath"

test('when no folder was configured then the default path should be determined', () => {
    delete process.env[EnvironmentVariables.DOWNLOAD_PATH]
    const determinedFolderPath = determineDownloadFolderPath()

    expect(determinedFolderPath)
        .toEqual(path.resolve(`${__dirname}/../../../data/original/null`))
})

test('when the provided folder path is empty then the default path should be determined', () => {
    process.env[EnvironmentVariables.DOWNLOAD_PATH] = ""
    const determinedFolderPath = determineDownloadFolderPath()

    expect(determinedFolderPath)
        .toEqual(path.resolve(`${__dirname}/../../../data/original/null`))
})

test('a valid folder path should be determined correctly', () => {
    process.env[EnvironmentVariables.DOWNLOAD_PATH] = "/home/test/tmp/flickr/albums/"
    const determinedFolderPath = determineDownloadFolderPath()

    expect(determinedFolderPath)
        .toEqual("/home/test/tmp/flickr/albums")
})

test('folder paths should be resolved correctly', () => {
    process.env[EnvironmentVariables.DOWNLOAD_PATH] = "/home/test/tmp/flickr/misc/../albums/"
    const determinedFolderPath = determineDownloadFolderPath()

    expect(determinedFolderPath)
        .toEqual("/home/test/tmp/flickr/albums")
})
