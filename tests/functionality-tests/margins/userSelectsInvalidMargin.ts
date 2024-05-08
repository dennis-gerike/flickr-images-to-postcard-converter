import {JimpClient} from "../../../lib/jimp/JimpClient"

test('selecting a negative margin should lead to an error', () => {
    const jimpClient = new JimpClient()
    expect(() => {
        jimpClient.setMargin(0, -5)
    }).toThrow(Error)
})
