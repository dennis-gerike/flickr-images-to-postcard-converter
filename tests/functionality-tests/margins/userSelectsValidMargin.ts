import {JimpClient} from "../../../lib/jimp/JimpClient"

test('selecting a valid margin should not lead to an error', () => {
    const jimpClient = new JimpClient()
    expect(() => {
        jimpClient.setMargin(4, 12)
    }).not.toThrow(Error)
})
