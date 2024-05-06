import {Logger} from "./Logger"

export const ConsoleLogger: Logger = {
    log: (message: string): void => {
        console.log(message)
    }
}
