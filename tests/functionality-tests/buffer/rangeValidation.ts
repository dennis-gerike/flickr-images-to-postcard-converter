import {JimpClient} from "../../../lib/jimp/JimpClient"

/**
 * @group unit
 */
describe('Buffer', () => {
    describe('Range validation', () => {
        test('Selecting a negative buffer should lead to an error', () => {
            const jimpClient = new JimpClient()
            const caption = {
                text: "dummy text",
                relativeHeight: 10,
                relativeVerticalBuffer: -5
            }

            expect(() => {
                jimpClient.setCaption(caption)
            }).toThrow(Error)
        })

        test('Selecting a buffer greater 100 percent should lead to an error', () => {
            const jimpClient = new JimpClient()
            const caption = {
                text: "dummy text",
                relativeHeight: 10,
                relativeVerticalBuffer: 101
            }

            expect(() => {
                jimpClient.setCaption(caption)
            }).toThrow(Error)
        })

        test('Selecting a valid buffer should NOT lead to an error', () => {
            const jimpClient = new JimpClient()
            const caption = {
                text: "dummy text",
                relativeHeight: 10,
                relativeVerticalBuffer: 28
            }

            expect(() => {
                jimpClient.setCaption(caption)
            }).not.toThrow(Error)
        })
    })
})
