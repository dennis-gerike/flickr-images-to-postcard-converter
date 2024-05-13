import {EnvironmentVariables} from "../../EnvironmentVariables"

beforeEach(() => {
    Object.keys(EnvironmentVariables).forEach(key => {
        delete process.env[key]
    })
})
