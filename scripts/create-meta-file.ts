import fs from "fs"

const projectKey = "FP2PC"
const issueTypeId = "10103"
const environments = ["linux/amd64"]
const dateTime = new Date().toUTCString()

const metaInfo = {
    "fields": {
        "summary": dateTime,
        "project": {
            "key": projectKey
        },
        "issuetype": {
            "id": issueTypeId
        },
        "customfield_10619": "b78ae6e6190a52b72d64152f74299c7b5bc14982"
    },
    "xrayFields": {
        "environments": environments
    }
}

const tempDirectoryPath = `${__dirname}/../test-reports`
fs.mkdirSync(tempDirectoryPath, {recursive: true})
fs.writeFileSync(tempDirectoryPath + '/meta-info.json', JSON.stringify(metaInfo, null, 2))
