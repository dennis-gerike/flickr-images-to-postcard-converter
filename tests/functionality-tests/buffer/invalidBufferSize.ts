import {JimpClient} from "../../../lib/jimp/JimpClient"
import {getFixturesFolderPath} from "../_helper/getFixturesFolderPath"

test('using invalid buffer sizes should lead to an error', async () => {
    const bufferSize = -1

    // selecting a fixture as input image
    const source = `${getFixturesFolderPath()}/1by1`
    const sourcePhotoPath = `${source}_medium.jpg`
    const photoId = require(`${source}.json`).id

    // trying to set invalid buffer
    const jimpClient = new JimpClient()
    expect(() => {
        jimpClient.setCaption({
            relativeVerticalBuffer: bufferSize,
            relativeHeight: 5,
            text: "dummy text"
        })
    }).toThrow(Error)
})
