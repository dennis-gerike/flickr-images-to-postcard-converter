import {EnvironmentVariables} from "./types/EnvironmentVariables"

export function determineMediaId() {
    const userDefinedMediaId = process.env[EnvironmentVariables.MEDIA_ID]

    if (typeof userDefinedMediaId === "undefined" || userDefinedMediaId === "") {
        throw new Error('Source ID missing!')
    }

    return userDefinedMediaId
}
