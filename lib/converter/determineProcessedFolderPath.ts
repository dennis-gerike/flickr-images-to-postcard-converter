import * as path from "node:path"
import {EnvironmentVariables} from "./types/EnvironmentVariables"

/**
 * A disk folder is needed to store the processed images.
 * The user can specify s custom folder, otherwise the default folder will be used.
 * In both cases a subdirectory will be created in that folder, so multiple app runs don't create a data mess.
 */
export function determineProcessedFolderPath(mediaId: string) {
    const defaultFolderPath = path.resolve(`${__dirname}/../../data/processed/${mediaId}`)
    const userDefinedFolderPath = process.env[EnvironmentVariables.PROCESSED_PATH]

    if (typeof userDefinedFolderPath === "undefined" || userDefinedFolderPath === "") {
        return defaultFolderPath
    }

    return path.resolve(`${userDefinedFolderPath}/${mediaId}`)
}
