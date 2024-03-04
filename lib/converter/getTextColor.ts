import {EnvironmentVariables} from "./types/EnvironmentVariables"

export function getTextColor() {
    let red = 0
    let green = 0
    let blue = 0

    if (process.env[EnvironmentVariables.TEXT_COLOR]) {
        const textColor = (process.env[EnvironmentVariables.TEXT_COLOR] as string).split(',')
        if (textColor.length !== 3) {
            console.warn('Invalid RGB colors provided! Using default values instead.')
        } else {
            red = Number(textColor[0])
            green = Number(textColor[1])
            blue = Number(textColor[2])
        }
    }

    return {red, green, blue}
}
