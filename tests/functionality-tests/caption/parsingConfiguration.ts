import {EnvironmentVariables} from "../../EnvironmentVariables"
import {determineCaption} from "../../../lib/converter/determineCaption"

/**
 * @group unit
 */
describe('Caption', () => {
    describe('Parsing configuration', () => {
        test('When no caption was configured then the default value should be determined', () => {
            delete process.env[EnvironmentVariables.CUSTOM_TEXT]
            const determinedCaption = determineCaption()

            expect(determinedCaption)
                .toEqual("")
        })

        test('When the caption is empty then the default value should be determined', () => {
            process.env[EnvironmentVariables.CUSTOM_TEXT] = ""
            const determinedCaption = determineCaption()

            expect(determinedCaption)
                .toEqual("")
        })

        test('A valid caption value should be determined correctly', () => {
            process.env[EnvironmentVariables.CUSTOM_TEXT] = "hello caption"

            expect(determineCaption())
                .toEqual("hello caption")
        })
    })
})
