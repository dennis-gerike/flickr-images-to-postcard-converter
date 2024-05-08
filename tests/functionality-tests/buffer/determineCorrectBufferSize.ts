import {EnvironmentVariables} from "../../EnvironmentVariables"
import {determineBuffer} from "../../../lib/converter/determineBuffer"

test('when no buffer was configured then the default value should be determined', async () => {
    delete process.env[EnvironmentVariables.TEXT_VERTICAL_BUFFER]

    const determinedBuffer = determineBuffer()
    expect(determinedBuffer)
        .toEqual(0)
})

test('when the buffer is empty then the default value should be determined', async () => {
    process.env[EnvironmentVariables.TEXT_VERTICAL_BUFFER] = ""

    const determinedBuffer = determineBuffer()
    expect(determinedBuffer)
        .toEqual(0)
})

test('when the buffer is invalid then an error should occur', async () => {
    process.env[EnvironmentVariables.TEXT_VERTICAL_BUFFER] = "nine"

    expect(() => {
        determineBuffer()
    }).toThrow(Error)
})

test('when the buffer is out of range then an error should occur', async () => {
    process.env[EnvironmentVariables.TEXT_VERTICAL_BUFFER] = "100.1"
    expect(() => {
        determineBuffer()
    }).toThrow(Error)

    process.env[EnvironmentVariables.TEXT_VERTICAL_BUFFER] = "-2"
    expect(() => {
        determineBuffer()
    }).toThrow(Error)
})

test('when the buffer is valid then no error should occur', async () => {
    process.env[EnvironmentVariables.TEXT_VERTICAL_BUFFER] = "17"

    expect(() => {
        determineBuffer()
    }).not.toThrow(Error)
})

test('a valid buffer should be determined correctly', async () => {
    process.env[EnvironmentVariables.TEXT_VERTICAL_BUFFER] = "21"

    expect(determineBuffer())
        .toEqual(21)
})
