import {EnvironmentVariables} from "../../EnvironmentVariables"
import {determineVerticalMargin} from "../../../lib/converter/determineVerticalMargin"
import {determineHorizontalMargin} from "../../../lib/converter/determineHorizontalMargin"

/**
 * @group unit
 */
describe('Margin', () => {
    describe('Parsing configuration', () => {
        test('When no vertical margin was configured then the default value should be determined', () => {
            delete process.env[EnvironmentVariables.MARGIN_VERTICAL]
            const determinedMargin = determineVerticalMargin()

            expect(determinedMargin)
                .toEqual(0)
        })

        test('When no horizontal margin was configured then the default value should be determined', () => {
            delete process.env[EnvironmentVariables.MARGIN_HORIZONTAL]
            const determinedMargin = determineHorizontalMargin()

            expect(determinedMargin)
                .toEqual(0)
        })

        test('When the vertical margin is empty then the default value should be determined', () => {
            process.env[EnvironmentVariables.MARGIN_VERTICAL] = ""
            const determinedMargin = determineVerticalMargin()

            expect(determinedMargin)
                .toEqual(0)
        })

        test('When the horizontal margin is empty then the default value should be determined', () => {
            process.env[EnvironmentVariables.MARGIN_HORIZONTAL] = ""
            const determinedMargin = determineVerticalMargin()

            expect(determinedMargin)
                .toEqual(0)
        })

        test('When the vertical margin is invalid then an error should occur', () => {
            process.env[EnvironmentVariables.MARGIN_VERTICAL] = "eleven"

            expect(() => {
                determineVerticalMargin()
            }).toThrow(Error)
        })

        test('When the horizontal margin is invalid then an error should occur', () => {
            process.env[EnvironmentVariables.MARGIN_HORIZONTAL] = "twelve"

            expect(() => {
                determineHorizontalMargin()
            }).toThrow(Error)
        })

        test('When the vertical margin is out of range then an error should occur', () => {
            process.env[EnvironmentVariables.MARGIN_VERTICAL] = "100.2"
            expect(() => {
                determineVerticalMargin()
            }).toThrow(Error)

            process.env[EnvironmentVariables.MARGIN_VERTICAL] = "-0.1"
            expect(() => {
                determineVerticalMargin()
            }).toThrow(Error)
        })

        test('When the horizontal margin is out of range then an error should occur', () => {
            process.env[EnvironmentVariables.MARGIN_HORIZONTAL] = "110"
            expect(() => {
                determineHorizontalMargin()
            }).toThrow(Error)

            process.env[EnvironmentVariables.MARGIN_HORIZONTAL] = "-3.5"
            expect(() => {
                determineHorizontalMargin()
            }).toThrow(Error)
        })

        test('When the vertical margin is valid then no error should occur', () => {
            process.env[EnvironmentVariables.MARGIN_VERTICAL] = "17.1"

            expect(() => {
                determineVerticalMargin()
            }).not.toThrow(Error)
        })

        test('When the horizontal margin is valid then no error should occur', () => {
            process.env[EnvironmentVariables.MARGIN_HORIZONTAL] = "33"

            expect(() => {
                determineHorizontalMargin()
            }).not.toThrow(Error)
        })

        test('A valid vertical margin value should be determined correctly', () => {
            process.env[EnvironmentVariables.MARGIN_VERTICAL] = "7.333"

            expect(determineVerticalMargin())
                .toEqual(7.333)
        })

        test('A valid horizontal margin value should be determined correctly', () => {
            process.env[EnvironmentVariables.MARGIN_HORIZONTAL] = "9.9"

            expect(determineHorizontalMargin())
                .toEqual(9.9)
        })
    })
})
