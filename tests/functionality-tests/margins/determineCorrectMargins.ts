import {EnvironmentVariables} from "../../EnvironmentVariables"
import {determineHorizontalMargin} from "../../../lib/converter/determineHorizontalMargin"
import {determineVerticalMargin} from "../../../lib/converter/determineVerticalMargin"

test('when no margin was configured then the default value should be determined', async () => {
    delete process.env[EnvironmentVariables.MARGIN_HORIZONTAL]
    delete process.env[EnvironmentVariables.MARGIN_VERTICAL]

    const determinedHorizontalMargin = determineHorizontalMargin()
    expect(determinedHorizontalMargin)
        .toEqual(0)

    const determinedVerticalMargin = determineVerticalMargin()
    expect(determinedVerticalMargin)
        .toEqual(0)
})

test('when the margin is empty then the default value should be determined', async () => {
    process.env[EnvironmentVariables.MARGIN_HORIZONTAL] = ""
    process.env[EnvironmentVariables.MARGIN_VERTICAL] = ""

    const determinedHorizontalMargin = determineHorizontalMargin()
    expect(determinedHorizontalMargin)
        .toEqual(0)

    const determinedVerticalMargin = determineVerticalMargin()
    expect(determinedVerticalMargin)
        .toEqual(0)
})

test('when the margin is invalid then an error should occur', async () => {
    process.env[EnvironmentVariables.MARGIN_HORIZONTAL] = "seven"
    expect(() => {
        determineHorizontalMargin()
    }).toThrow(Error)

    process.env[EnvironmentVariables.MARGIN_VERTICAL] = "eight"
    expect(() => {
        determineVerticalMargin()
    }).toThrow(Error)
})

test('when the margin is out of range then an error should occur', async () => {
    process.env[EnvironmentVariables.MARGIN_HORIZONTAL] = "101"
    expect(() => {
        determineHorizontalMargin()
    }).toThrow(Error)

    process.env[EnvironmentVariables.MARGIN_VERTICAL] = "-5"
    expect(() => {
        determineVerticalMargin()
    }).toThrow(Error)
})

test('when the margin is valid then no error should occur', async () => {
    process.env[EnvironmentVariables.MARGIN_HORIZONTAL] = "11"
    expect(() => {
        determineHorizontalMargin()
    }).not.toThrow(Error)

    process.env[EnvironmentVariables.MARGIN_VERTICAL] = "17"
    expect(() => {
        determineVerticalMargin()
    }).not.toThrow(Error)
})

test('a valid margin should be determined correctly', async () => {
    process.env[EnvironmentVariables.MARGIN_HORIZONTAL] = "3"
    expect(determineHorizontalMargin())
        .toEqual(3)

    process.env[EnvironmentVariables.MARGIN_VERTICAL] = "9"
    expect(determineVerticalMargin())
        .toEqual(9)
})
