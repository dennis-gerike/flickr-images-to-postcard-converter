import {determineImageFileName} from "../../../lib/converter/determineImageFileName"

/**
 * @group unit
 */
describe('Media ID', () => {
    describe('Determine filename', () => {
        test('When the photo id is empty then the default file name should be determined', () => {
            const determinedFileName = determineImageFileName("")

            expect(determinedFileName)
                .toEqual("undefined.jpg")
        })

        test('With a non-empty photo id the file name should be determined correctly', () => {
            const determinedFileName = determineImageFileName("123456789")

            expect(determinedFileName)
                .toEqual("123456789.jpg")
        })
    })
})
