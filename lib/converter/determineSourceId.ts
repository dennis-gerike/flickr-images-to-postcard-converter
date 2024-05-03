import {EnvironmentVariables} from "./types/EnvironmentVariables"

export function determineSourceId() {
    const defaultSourceId = null
    const userDefinedSourceId = process.env[EnvironmentVariables.SOURCE_ID]

    if (typeof userDefinedSourceId === "undefined" || userDefinedSourceId === "") {
        return defaultSourceId
    }

    return userDefinedSourceId
}
