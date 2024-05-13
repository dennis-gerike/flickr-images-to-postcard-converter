import {EnvironmentVariables} from "./types/EnvironmentVariables"

export function determineFlickrApiKey() {
    const userDefinedApiKey = process.env[EnvironmentVariables.FLICKR_API_KEY]

    if (typeof userDefinedApiKey === "undefined" || userDefinedApiKey === "") {
        throw new Error('Flickr API Key missing!')
    }

    return userDefinedApiKey
}
