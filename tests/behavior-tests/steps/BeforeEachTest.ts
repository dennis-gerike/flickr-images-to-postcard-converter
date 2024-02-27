import {Before} from "@cucumber/cucumber"
import {EnvironmentVariables} from "../../../lib/converter/types/EnvironmentVariables"

/**
 * The only way to configure the app is via env variables or an env file.
 * To be able to test different situations the behavior tests will set those env variables on the fly.
 * Problem: Cucumber will NOT remove those env variables after (or before) a test.
 * Therefore, any test that follows has a high chance to fail, because it ends up with a wrong environment configuration.
 *
 * Before a test is started, this hook will delete every app-specific environment variable.
 */
Before(function () {
    Object.keys(EnvironmentVariables).forEach(key => {
        if (key !== EnvironmentVariables.FLICKR_API_KEY) {
            delete process.env[key]
        }
    })
})
