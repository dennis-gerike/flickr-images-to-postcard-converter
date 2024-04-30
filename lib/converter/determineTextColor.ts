import {EnvironmentVariables} from "./types/EnvironmentVariables"

export type RgbColor = {
    red: number,
    green: number,
    blue: number,
}

export function determineTextColor(): RgbColor {
    const defaultTextColor: RgbColor = {red: 0, green: 0, blue: 0}
    const userDefinedTextColor = process.env[EnvironmentVariables.TEXT_COLOR] as string

    if (typeof userDefinedTextColor === "undefined" || userDefinedTextColor === "") {
        return defaultTextColor
    }

    const colorChannels = userDefinedTextColor.split(',')

    if (colorChannels.length !== 3
        || isNaN(Number(colorChannels[0]))
        || isNaN(Number(colorChannels[1]))
        || isNaN(Number(colorChannels[2]))) {
        throw new Error('Invalid RGB colors provided!')
    }

    return {
        red: Number(colorChannels[0]),
        green: Number(colorChannels[1]),
        blue: Number(colorChannels[2]),
    }
}
