import axios from "axios"
import fs from "fs"

/**
 * Providing simplified access to the Xray API, managing the credentials and dealing with the access tokens.
 */
export class XrayClient {
    private xrayClientId: string | undefined
    private xrayClientSecret: string | undefined
    private xrayApiToken: string | undefined
    private temporaryFolder = '.'

    /**
     * On instantiation this class it will automatically search for the API credentials in the environment variables.
     * When the caller prefers to provide them explicitly (or wants to switch to a different user profile)
     * they can be overridden via `setCredentials()`.
     */
    constructor() {
        this.parseCredentialsFromEnvironmentVariables()
    }

    /**
     * Explicitly setting or overriding the credentials for the Xray API.
     */
    public setCredentials(clientId: string, clientSecret: string) {
        this.xrayClientId = clientId
        this.xrayClientSecret = clientSecret
    }

    /**
     * Requesting the tests (and all necessary metadata) from Jira resp. Xray.
     */
    public async downloadTests() {
        const rawTests = await this.fetchRawTests()
        this.storeRawTestsOnDisk(rawTests)
    }

    /**
     * Writing the raw tests to disk.
     * This makes debugging easier and allows to completely separate the jobs of downloading and processing the test information.
     */
    private storeRawTestsOnDisk(tests: any) {
        fs.writeFileSync(`${this.temporaryFolder}/downloaded-scenarios.json`, JSON.stringify(tests, null, 2))
    }

    /**
     * Trying to extract the Xray API credentials from the environment variables.
     * Expects the variables "XRAY_CLIENT_ID" and "XRAY_CLIENT_SECRET".
     */
    private parseCredentialsFromEnvironmentVariables() {
        this.xrayClientId = process.env.XRAY_CLIENT_ID
        this.xrayClientSecret = process.env.XRAY_CLIENT_SECRET
    }

    /**
     * Requesting an API token from Xray, which is necessary to interact with the Xray API.
     * The Xray Client ID and the Xray Client Secret are used for authentication.
     * When they were not provided (see constructor or `setCredentials()`) or are invalid then this request will fail.
     */
    private async obtainApiToken() {
        const url = 'https://xray.cloud.getxray.app/api/v2/authenticate'
        const data = {
            'client_id': this.xrayClientId,
            'client_secret': this.xrayClientSecret,
        }

        const response = await axios
            .post(url, data)
            .catch((reason) => {
                throw new Error(`Authentication against the Xray API failed. Please check the provided credentials. Status Code: ${reason.status}`)
            })

        this.xrayApiToken = response.data
    }

    /**
     * Requesting all relevant tests and meta information from the Xray API.
     * What is "relevant" needs to be specified in `getGraphQlQueryToGetAllTests()`.
     * Returns a big json object containing all information.
     */
    private async fetchRawTests() {
        await this.obtainApiToken()

        const url = 'https://xray.cloud.getxray.app/api/v2/graphql'
        const headers = {
            'Authorization': 'Bearer ' + this.xrayApiToken
        }
        const data = {
            query: getGraphQlQueryToGetAllTests()
        }

        const response = await axios
            .post(url, data, {headers})
            .catch((reason) => {
                throw new Error(`Requesting the tests from the Xray API failed. Status Code: ${reason.status}`)
            })

        return response.data
    }
}

/**
 * Specifies the GraphQL query that is used to request all tests from Xray.
 */
function getGraphQlQueryToGetAllTests() {
    return `query {
              getTests(jql: "project = FP2PC AND testType = Cucumber", limit: 100)
              {
                  total
                  results {
                      issueId
                      scenarioType
                      gherkin
                      jira(fields: ["key", "status", "issuelinks", "summary", "labels"])
                  }
              }
          }`
}
