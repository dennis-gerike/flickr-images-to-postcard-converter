import {determineMetaInformationFileName} from "../../../lib/converter/determineMetaInformationFileName"

test('when the photo id is empty then the default meta info file name should be determined', () => {
    const determinedFileName = determineMetaInformationFileName("")

    expect(determinedFileName).toEqual("undefined.json")
})

test('with a non-empty photo id the meta info file name should be determined correctly', () => {
    const determinedFileName = determineMetaInformationFileName("123456789")

    expect(determinedFileName).toEqual("123456789.json")
})
