import fs from "fs"
import "./Logger"
import {Logger} from "./Logger"

/**
 * Removes all files and directories that might have been created while running the app or the tests.
 */
export function cleanupEverything(logger?: Logger) {
    cleanupDataFolders(logger)
    cleanupTestReports(logger)
    cleanupMiscFiles(logger)
}

/**
 * Removes the test report folder.
 */
export function cleanupTestReports(logger?: Logger) {
    const targets = [
        `${__dirname}/../test-reports`,
    ]

    cleanup(targets, logger)
}

/**
 * Removes the downloaded and processed images.
 */
export function cleanupDataFolders(logger?: Logger) {
    const targets = [
        `${__dirname}/../data`,
        `${__dirname}/behavior-tests/_data`,
        `${__dirname}/functionality-tests/_data`,
    ]

    cleanup(targets, logger)
}

/**
 * Removes the remaining files that might have been created.
 */
export function cleanupMiscFiles(logger?: Logger) {
    const targets = [
        `${__dirname}/../eng.traineddata`,
    ]

    cleanup(targets, logger)
}

/**
 * Removes every file and directory that has been selected as target.
 */
function cleanup(targets: string[], logger?: Logger) {
    targets.forEach(path => {
        fs.rmSync(path, {recursive: true, force: true})
        if (logger) {
            logger.log(`"${path}" deleted`)
        }
    })
}
