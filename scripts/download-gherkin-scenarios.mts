import {XrayClient} from "../lib/xray/XrayClient.mjs"
import {XrayGherkinExtractor} from "../lib/gherkin/XrayGherkinExtractor.mjs"
import {GherkinRenderer} from "../lib/gherkin/GherkinRenderer.mjs"

const xrayClient = new XrayClient()
const rawTests = await xrayClient.downloadTests()
const rawGherkins = XrayGherkinExtractor.extract(rawTests)
const renderedGherkins = GherkinRenderer.renderAll(rawGherkins)
console.log(renderedGherkins)
