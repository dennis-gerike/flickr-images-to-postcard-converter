import {EnvironmentVariables} from "../../EnvironmentVariables"
import {determineFlickrApiKey} from "../../../lib/converter/determineFlickrApiKey"

/**
 * @group unit
 */
describe('Flickr API Key', () => {
    describe('Parsing configuration', () => {
        test('When no api key was configured then an error should occur', () => {
            delete process.env[EnvironmentVariables.FLICKR_API_KEY]

            expect(() => {
                determineFlickrApiKey()
            }).toThrow(Error)
        })

        test('When an empty api key was provided then an error should occur', () => {
            process.env[EnvironmentVariables.FLICKR_API_KEY] = ""

            expect(() => {
                determineFlickrApiKey()
            }).toThrow(Error)
        })

        test('A potentially valid api key should be determined correctly', () => {
            process.env[EnvironmentVariables.FLICKR_API_KEY] = "LLLLL-AAAAA-FFFFF"

            expect(determineFlickrApiKey())
                .toEqual("LLLLL-AAAAA-FFFFF")
        })
    })
})
