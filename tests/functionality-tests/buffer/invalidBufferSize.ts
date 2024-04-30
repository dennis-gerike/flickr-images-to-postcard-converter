import {JimpClient} from "../../../lib/jimp/JimpClient"
import {getFixturesFolderPath} from "../_helper/getFixturesFolderPath"

describe.each([
    -1,
    -0.1,
    100.01,
    101,
])
('buffer', (bufferSize: number) => {
    test(`a buffer size of ${bufferSize} should lead to an error`, () => {
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
})