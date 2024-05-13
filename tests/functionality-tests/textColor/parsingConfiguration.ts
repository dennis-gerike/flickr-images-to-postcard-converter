import {EnvironmentVariables} from "../../EnvironmentVariables"
import {determineTextColor} from "../../../lib/converter/determineTextColor"

/**
 * @group unit
 */
describe('Text Color', () => {
    describe('Parsing configuration', () => {
        test('When no text color was configured then the default value should be determined', () => {
            delete process.env[EnvironmentVariables.TEXT_COLOR]
            const determinedTextColor = determineTextColor()

            expect(determinedTextColor)
                .toEqual({red: 0, green: 0, blue: 0})
        })

        test('When the text color is empty then the default value should be determined', () => {
            process.env[EnvironmentVariables.TEXT_COLOR] = ""
            const determinedTextColor = determineTextColor()

            expect(determinedTextColor)
                .toEqual({red: 0, green: 0, blue: 0})
        })

        test('When the number of color channels is invalid then an error should occur', () => {
            process.env[EnvironmentVariables.TEXT_COLOR] = "10,20"

            expect(() => {
                determineTextColor()
            }).toThrow(Error)
        })

        test('When the color values are invalid then an error should occur', () => {
            process.env[EnvironmentVariables.TEXT_COLOR] = "A,B,C"

            expect(() => {
                determineTextColor()
            }).toThrow(Error)
        })

        test('When the text color is valid then no error should occur', () => {
            process.env[EnvironmentVariables.TEXT_COLOR] = "10,20,30"

            expect(() => {
                determineTextColor()
            }).not.toThrow(Error)
        })

        test('A valid text color should be determined correctly', () => {
            process.env[EnvironmentVariables.TEXT_COLOR] = "11,21,31"

            expect(determineTextColor())
                .toEqual({red: 11, green: 21, blue: 31})
        })
    })
})
