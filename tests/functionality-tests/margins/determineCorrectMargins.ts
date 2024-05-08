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
