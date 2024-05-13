import {JimpClient} from "../../../lib/jimp/JimpClient"

/**
 * @group unit
 */
describe('Margin', () => {
    describe('Range validation', () => {
        test('Selecting a negative margin should lead to an error', () => {
            const jimpClient = new JimpClient()

            expect(() => {
                jimpClient.setMargin(0, -5)
            }).toThrow(Error)

            expect(() => {
                jimpClient.setMargin(-7, 0)
            }).toThrow(Error)
        })

        test('Selecting a margin greater 100 percent should lead to an error', () => {
            const jimpClient = new JimpClient()

            expect(() => {
                jimpClient.setMargin(0, 101)
            }).toThrow(Error)

            expect(() => {
                jimpClient.setMargin(1005, 0)
            }).toThrow(Error)
        })

        test('Selecting a valid margin should NOT lead to an error', () => {
            const jimpClient = new JimpClient()

            expect(() => {
                jimpClient.setMargin(10, 5)
            }).not.toThrow(Error)
        })
    })
})
