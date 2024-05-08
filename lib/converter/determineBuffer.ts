import {EnvironmentVariables} from "./types/EnvironmentVariables"

export function determineBuffer(): number {
    const defaultBuffer = 0
    const minValue = 0
    const maxValue = 100
    const userDefinedBuffer = process.env[EnvironmentVariables.TEXT_VERTICAL_BUFFER]

    if (typeof userDefinedBuffer === "undefined" || userDefinedBuffer === "") {
        return defaultBuffer
    }

    if (isNaN(Number(userDefinedBuffer))) {
        throw new Error('Invalid buffer value provided!')
    }

    if (Number(userDefinedBuffer) < minValue || Number(userDefinedBuffer) > maxValue) {
        throw new Error('Buffer size out of range!')
    }

    return Number(userDefinedBuffer)
}
