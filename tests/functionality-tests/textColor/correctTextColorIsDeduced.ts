import {EnvironmentVariables} from "../../../lib/converter/types/EnvironmentVariables"
import {determineTextColor} from "../../../lib/converter/determineTextColor"

test('when no text color was configured then the default value should be determined', async () => {
    delete process.env[EnvironmentVariables.TEXT_COLOR]
    const determinedTextColor = determineTextColor()

    expect(determinedTextColor).toEqual({red: 0, green: 0, blue: 0})
})

test('when the text color is empty then the default value should be determined', async () => {
    process.env[EnvironmentVariables.TEXT_COLOR] = ""
    const determinedTextColor = determineTextColor()

    expect(determinedTextColor).toEqual({red: 0, green: 0, blue: 0})
})

test('when the number of color channels is invalid then an error should occur', async () => {
    process.env[EnvironmentVariables.TEXT_COLOR] = "10,20"

    expect(() => {
        determineTextColor()
    }).toThrow(Error)
})

test('when the color values are invalid then an error should occur', async () => {
    process.env[EnvironmentVariables.TEXT_COLOR] = "A,B,C"

    expect(() => {
        determineTextColor()
    }).toThrow(Error)
})

test('when the text color is valid then no error should occur', async () => {
    process.env[EnvironmentVariables.TEXT_COLOR] = "10,20,30"

    expect(() => {
        determineTextColor()
    }).not.toThrow(Error)
})
