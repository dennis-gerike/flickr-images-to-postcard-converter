import {EnvironmentVariables} from "./types/EnvironmentVariables"
import {determineMargin} from "./determineMargin"

export function determineVerticalMargin(): number {
    return determineMargin(process.env[EnvironmentVariables.MARGIN_VERTICAL])
}
