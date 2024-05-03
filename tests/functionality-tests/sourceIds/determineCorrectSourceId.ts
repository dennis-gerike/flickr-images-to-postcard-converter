import {EnvironmentVariables} from "../../../lib/converter/types/EnvironmentVariables"
import {determineSourceId} from "../../../lib/converter/determineSourceId"

test('when no source id was configured then the default value should be determined', async () => {
    delete process.env[EnvironmentVariables.SOURCE_ID]
    const determinedSourceId = determineSourceId()

    expect(determinedSourceId)
        .toBeNull()
})

test('when the source id is empty then the default value should be determined', async () => {
    process.env[EnvironmentVariables.SOURCE_ID] = ""
    const determinedSourceId = determineSourceId()

    expect(determinedSourceId)
        .toBeNull()
})

test('a potentially valid source id should be determined correctly', async () => {
    process.env[EnvironmentVariables.SOURCE_ID] = "123456789"

    expect(determineSourceId())
        .toEqual("123456789")
})
