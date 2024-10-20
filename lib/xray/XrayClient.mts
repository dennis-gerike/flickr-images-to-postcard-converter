import axios from "axios"

/**
 * Providing simplified access to the Xray API, managing the credentials and dealing with the access tokens.
 */
export class XrayClient {
    private xrayClientId: string | undefined
    private xrayClientSecret: string | undefined
    private xrayApiToken: string | undefined

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
}
