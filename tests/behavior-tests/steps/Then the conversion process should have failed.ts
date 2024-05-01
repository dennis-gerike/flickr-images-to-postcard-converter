import {When} from "@cucumber/cucumber"
import assert from "assert"

When('the conversion process should have failed', function () {
    assert.equal(this.conversionProcessFailed, true, "the application should have run into an error or exception")
})