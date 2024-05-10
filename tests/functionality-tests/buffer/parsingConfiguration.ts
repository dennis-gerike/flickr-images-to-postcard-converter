import {EnvironmentVariables} from "../../EnvironmentVariables"
import {determineBuffer} from "../../../lib/converter/determineBuffer"

/**
 * @group unit
 */
describe('Buffer', () => {
    describe('Parsing configuration', () => {
        test('When no buffer was configured then the default value should be determined', () => {
            delete process.env[EnvironmentVariables.TEXT_VERTICAL_BUFFER]
            const determinedBuffer = determineBuffer()

            expect(determinedBuffer)
                .toEqual(0)
        })

        test('When the buffer is empty then the default value should be determined', () => {
            process.env[EnvironmentVariables.TEXT_VERTICAL_BUFFER] = ""
            const determinedBuffer = determineBuffer()

            expect(determinedBuffer)
                .toEqual(0)
        })

        test('When the buffer is invalid then an error should occur', () => {
            process.env[EnvironmentVariables.TEXT_VERTICAL_BUFFER] = "nine"

            expect(() => {
                determineBuffer()
            }).toThrow(Error)
        })

        test('When the buffer is out of range then an error should occur', () => {
            process.env[EnvironmentVariables.TEXT_VERTICAL_BUFFER] = "100.1"
            expect(() => {
                determineBuffer()
            }).toThrow(Error)

            process.env[EnvironmentVariables.TEXT_VERTICAL_BUFFER] = "-2"
            expect(() => {
                determineBuffer()
            }).toThrow(Error)
        })

        test('When the buffer is valid then no error should occur', () => {
            process.env[EnvironmentVariables.TEXT_VERTICAL_BUFFER] = "17"

            expect(() => {
                determineBuffer()
            }).not.toThrow(Error)
        })

        test('A valid buffer value should be determined correctly', () => {
            process.env[EnvironmentVariables.TEXT_VERTICAL_BUFFER] = "21"

            expect(determineBuffer())
                .toEqual(21)
        })
    })
})
