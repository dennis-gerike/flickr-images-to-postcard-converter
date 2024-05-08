import {JimpClient} from "../../../lib/jimp/JimpClient"

test('selecting a negative aspect ratio should lead to an error', async () => {
    const jimpClient = new JimpClient()
    expect(() => {
        jimpClient.setAspectRatio(-5)
    }).toThrow(Error)
})
