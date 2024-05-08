import {EnvironmentVariables} from "./types/EnvironmentVariables"
import {determineMargin} from "./determineMargin"

export function determineHorizontalMargin(): number {
    return determineMargin(process.env[EnvironmentVariables.MARGIN_HORIZONTAL])
}
