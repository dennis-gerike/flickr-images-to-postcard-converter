import {determineAspectRatio} from "../../../lib/converter/determineAspectRatio"
import {EnvironmentVariables} from "../../EnvironmentVariables"

/**
 * @group unit
 */
describe('Aspect Ratio', () => {
    describe('Parsing configuration', () => {
        test('When no aspect ratio was configured then the default value should be determined', () => {
            delete process.env[EnvironmentVariables.ASPECT_RATIO]
            const determinedAspectRatio = determineAspectRatio()

            expect(determinedAspectRatio)
                .toEqual(1)
        })

        test('When the aspect ratio is empty then the default value should be determined', () => {
            process.env[EnvironmentVariables.ASPECT_RATIO] = ""
            const determinedAspectRatio = determineAspectRatio()

            expect(determinedAspectRatio)
                .toEqual(1)
        })

        test('When the aspect ratio is invalid then an error should occur', () => {
            process.env[EnvironmentVariables.ASPECT_RATIO] = "ten"

            expect(() => {
                determineAspectRatio()
            }).toThrow(Error)
        })

        test('When the aspect ratio is valid then no error should occur', () => {
            process.env[EnvironmentVariables.ASPECT_RATIO] = "10"

            expect(() => {
                determineAspectRatio()
            }).not.toThrow(Error)
        })

        test('A valid aspect ratio should be determined correctly', () => {
            process.env[EnvironmentVariables.ASPECT_RATIO] = "2.5"

            expect(determineAspectRatio())
                .toEqual(2.5)
        })
    })
})
