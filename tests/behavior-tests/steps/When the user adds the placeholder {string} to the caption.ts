import {When} from "@cucumber/cucumber"
import {EnvironmentVariables} from "../../../lib/converter/types/EnvironmentVariables"

When('the user adds the placeholder {string} to the caption', function (placeholder: string) {
    let caption = process.env[EnvironmentVariables.CUSTOM_TEXT] ?? ''

    if (placeholder === "flickr-photo-id") {
        caption = `${caption} - <PHOTO_ID>`
    } else if (placeholder === "flickr-photo-title") {
        caption = `${caption} - <PHOTO_TITLE>`
    }

    process.env[EnvironmentVariables.CUSTOM_TEXT] = caption
})
