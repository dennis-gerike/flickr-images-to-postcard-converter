import {EnvironmentVariables} from "./types/EnvironmentVariables"

export function getAspectRatio(): number | null {
    const aspectRatio = process.env[EnvironmentVariables.ASPECT_RATIO]

    if (!aspectRatio) {
        return null
    }

    return Number(aspectRatio)
}
