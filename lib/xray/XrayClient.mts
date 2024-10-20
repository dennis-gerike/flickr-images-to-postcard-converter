/**
 * Providing simplified access to the Xray API, managing the credentials and dealing with the access tokens.
 */
export class XrayClient {
    private xrayClientId: string | undefined
    private xrayClientSecret: string | undefined

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
}
