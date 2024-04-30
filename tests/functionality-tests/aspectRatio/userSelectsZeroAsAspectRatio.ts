import {JimpClient} from "../../../lib/jimp/JimpClient"

test('selecting an aspect ratio of zero should lead to an error', async () => {
    const jimpClient = new JimpClient()
    expect(() => {
        jimpClient.setAspectRatio(0)
    }).toThrow(Error)
})
