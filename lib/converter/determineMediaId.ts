import {EnvironmentVariables} from "./types/EnvironmentVariables"

export function determineMediaId() {
    const defaultMediaId = null
    const userDefinedMediaId = process.env[EnvironmentVariables.MEDIA_ID]

    if (typeof userDefinedMediaId === "undefined" || userDefinedMediaId === "") {
        return defaultMediaId
    }

    return userDefinedMediaId
}
