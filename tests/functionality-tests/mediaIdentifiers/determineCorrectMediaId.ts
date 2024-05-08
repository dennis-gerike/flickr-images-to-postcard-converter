import {EnvironmentVariables} from "../../EnvironmentVariables"
import {determineMediaId} from "../../../lib/converter/determineMediaId"

test('when no media id was configured then null should be determined', () => {
    delete process.env[EnvironmentVariables.MEDIA_ID]
    const determinedMediaId = determineMediaId()

    expect(determinedMediaId)
        .toBeNull()
})

test('when the media id is empty then null should be determined', () => {
    process.env[EnvironmentVariables.MEDIA_ID] = ""
    const determinedMediaId = determineMediaId()

    expect(determinedMediaId)
        .toBeNull()
})

test('a potentially valid album id should be determined correctly', () => {
    process.env[EnvironmentVariables.MEDIA_ID] = "9876543210"
    const determinedMediaId = determineMediaId()

    expect(determinedMediaId)
        .toEqual("9876543210")
})
