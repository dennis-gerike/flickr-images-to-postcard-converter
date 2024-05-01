import {EnvironmentVariables} from "./types/EnvironmentVariables"

export function determineAspectRatio(): number {
    const defaultAspectRatio = 1
    const userDefinedAspectRatio = process.env[EnvironmentVariables.ASPECT_RATIO]

    if (typeof userDefinedAspectRatio === "undefined" || userDefinedAspectRatio === "") {
        return defaultAspectRatio
    }

    if (isNaN(Number(userDefinedAspectRatio))) {
        throw new Error('Invalid aspect ratio provided!')
    }

    return Number(userDefinedAspectRatio)
}
