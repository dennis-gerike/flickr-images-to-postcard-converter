/*
This script removes all files and directories that might have been created by running the app or the tests.
*/

import fs from "fs"

const targets = [
    `${__dirname}/../data`,
    `${__dirname}/../tests/behavior-tests/_data`,
    `${__dirname}/../tests/functionality-tests/_data`,
    `${__dirname}/../test-reports`,
    `${__dirname}/../eng.traineddata`,
]

targets.forEach(path => {
    fs.rm(path, {recursive: true}, err => {
        console.log(`"${path}" deleted`)
    })
})
