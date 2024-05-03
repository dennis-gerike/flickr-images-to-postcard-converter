import {EnvironmentVariables} from "./types/EnvironmentVariables"
import {SourceTypes} from "./types/SourceTypes"

export function determineSourceType() {
    const defaultSourceType = SourceTypes.FLICKR_PHOTO
    const userDefinedSourceType = process.env[EnvironmentVariables.SOURCE_TYPE]

    if (typeof userDefinedSourceType === "undefined" || userDefinedSourceType === "") {
        return defaultSourceType
    }

    if (!(Object.values(SourceTypes) as Array<string>).includes(userDefinedSourceType)) {
        throw new Error(`Invalid Source Type provided! Valid values are ${Object.values(SourceTypes)}.`)
    }

    return userDefinedSourceType
}
