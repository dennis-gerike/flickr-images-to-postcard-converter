import {EnvironmentVariables} from "../../EnvironmentVariables"
import {determineMediaId} from "../../../lib/converter/determineMediaId"

/**
 * @group unit
 */
describe('Download Photo', () => {
    describe('Parsing configuration', () => {
        test('When no photo ID was configured then an error should occur', () => {
            delete process.env[EnvironmentVariables.MEDIA_ID]

            expect(() => {
                determineMediaId()
            }).toThrow(Error)
        })

        test('When an empty photo ID was provided then an error should occur', () => {
            process.env[EnvironmentVariables.MEDIA_ID] = ""

            expect(() => {
                determineMediaId()
            }).toThrow(Error)
        })

        test('A potentially valid photo ID should be determined correctly', () => {
            process.env[EnvironmentVariables.MEDIA_ID] = "F123456789"

            expect(determineMediaId())
                .toEqual("F123456789")
        })
    })
})
