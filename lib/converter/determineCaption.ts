import {EnvironmentVariables} from "./types/EnvironmentVariables"

export function determineCaption() {
    const defaultCaption = ""
    const userDefinedCaption = process.env[EnvironmentVariables.CUSTOM_TEXT]

    if (typeof userDefinedCaption === "undefined" || userDefinedCaption === "") {
        return defaultCaption
    }

    return userDefinedCaption
}
