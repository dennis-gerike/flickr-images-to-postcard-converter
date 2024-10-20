import {XrayClient} from "../lib/xray/XrayClient.mjs"

const xrayClient = new XrayClient()
await xrayClient.downloadTests()
