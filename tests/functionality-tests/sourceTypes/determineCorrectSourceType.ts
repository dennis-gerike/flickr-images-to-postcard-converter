import {EnvironmentVariables} from "../../../lib/converter/types/EnvironmentVariables"
import {determineSourceType} from "../../../lib/converter/determineSourceType"
import {SourceTypes} from "../../../lib/converter/types/SourceTypes"

test('when no source type was configured then the default value should be determined', async () => {
    delete process.env[EnvironmentVariables.SOURCE_TYPE]
    const determinedSourceType = determineSourceType()

    expect(determinedSourceType)
        .toEqual(SourceTypes.FLICKR_PHOTO)
})

test('when the source type is empty then the default value should be determined', async () => {
    process.env[EnvironmentVariables.SOURCE_TYPE] = ""
    const determinedSourceType = determineSourceType()

    expect(determinedSourceType)
        .toEqual(SourceTypes.FLICKR_PHOTO)
})

test('when the source type is invalid then an error should occur', async () => {
    process.env[EnvironmentVariables.SOURCE_TYPE] = "wikimedia-category"

    expect(() => {
        determineSourceType()
    }).toThrow(Error)
})

test('when the source type is valid then no error should occur', async () => {
    process.env[EnvironmentVariables.SOURCE_TYPE] = SourceTypes.FLICKR_ALBUM

    expect(() => {
        determineSourceType()
    }).not.toThrow(Error)
})

test('a valid source type should be determined correctly', async () => {
    process.env[EnvironmentVariables.SOURCE_TYPE] = SourceTypes.FLICKR_ALBUM

    expect(determineSourceType())
        .toEqual("flickr-album")
})
