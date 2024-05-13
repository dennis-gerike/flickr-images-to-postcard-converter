import {EnvironmentVariables} from "../../EnvironmentVariables"
import {determineSourceType} from "../../../lib/converter/determineSourceType"
import {SourceTypes} from "../../../lib/converter/types/SourceTypes"

/**
 * @group unit
 */
describe('Source Types', () => {
    describe('Parsing configuration', () => {
        test('When no source type was configured then the default value should be determined', () => {
            delete process.env[EnvironmentVariables.SOURCE_TYPE]
            const determinedSourceType = determineSourceType()

            expect(determinedSourceType)
                .toEqual(SourceTypes.FLICKR_PHOTO)
        })

        test('When the source type is empty then the default value should be determined', () => {
            process.env[EnvironmentVariables.SOURCE_TYPE] = ""
            const determinedSourceType = determineSourceType()

            expect(determinedSourceType)
                .toEqual(SourceTypes.FLICKR_PHOTO)
        })

        test('When the source type is invalid then an error should occur', () => {
            process.env[EnvironmentVariables.SOURCE_TYPE] = "wikimedia-category"

            expect(() => {
                determineSourceType()
            }).toThrow(Error)
        })

        test('When the source type is valid then no error should occur', () => {
            process.env[EnvironmentVariables.SOURCE_TYPE] = SourceTypes.FLICKR_ALBUM

            expect(() => {
                determineSourceType()
            }).not.toThrow(Error)
        })

        test('The valid source type FLICKR_PHOTO should be determined correctly', () => {
            process.env[EnvironmentVariables.SOURCE_TYPE] = SourceTypes.FLICKR_PHOTO

            expect(determineSourceType())
                .toEqual("flickr-photo")
        })

        test('The valid source type FLICKR_ALBUM should be determined correctly', () => {
            process.env[EnvironmentVariables.SOURCE_TYPE] = SourceTypes.FLICKR_ALBUM

            expect(determineSourceType())
                .toEqual("flickr-album")
        })
    })
})
