import {JimpClient} from "../../../lib/jimp/JimpClient"

/**
 * @group unit
 */
describe('Aspect Ratio', () => {
    describe('Range validation', () => {
        test('Selecting a negative aspect ratio should lead to an error', () => {
            const jimpClient = new JimpClient()
            expect(() => {
                jimpClient.setAspectRatio(-5)
            }).toThrow(Error)
        })

        test('Selecting an aspect ratio of zero should lead to an error', () => {
            const jimpClient = new JimpClient()
            expect(() => {
                jimpClient.setAspectRatio(0)
            }).toThrow(Error)
        })

        test('Selecting a valid aspect ratio should NOT lead to an error', () => {
            const jimpClient = new JimpClient()
            expect(() => {
                jimpClient.setAspectRatio(2.1)
            }).not.toThrow(Error)
        })
    })
})
