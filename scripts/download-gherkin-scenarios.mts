import {XrayClient} from "../lib/xray/XrayClient.mjs"
import {XrayGherkinExtractor} from "../lib/gherkin/XrayGherkinExtractor.mjs"

const xrayClient = new XrayClient()
const rawTests = await xrayClient.downloadTests()
const extractedTests = XrayGherkinExtractor.extract(rawTests)
console.log(extractedTests)
