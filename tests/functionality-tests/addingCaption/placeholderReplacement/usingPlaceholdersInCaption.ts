import {resolvePlaceholdersInCaption} from "../../../../lib/converter/resolvePlaceholdersInCaption"
import {getFixturesFolderPath} from "../../_helper/getFixturesFolderPath"
import {ImageInformation} from "../../../../lib/flickr/types/internal/ImageInformation"

function getDummyImageInformation() {
    return {id: "", title: "", url: ""}
}

test("when no placeholders were specified, then the caption should not change", () => {
    const caption = "Test 1234"
    const resolvedCaption = resolvePlaceholdersInCaption(caption, getDummyImageInformation())

    expect(resolvedCaption).toEqual(caption)
})

test("when an unknown placeholder was specified, then the caption should not change", () => {
    const caption = "Test 1234 <BLUBB>"
    const resolvedCaption = resolvePlaceholdersInCaption(caption, getDummyImageInformation())

    expect(resolvedCaption).toEqual(caption)
})

test("when the placeholder <PHOTO_ID> was specified in the caption, then it should be resolved", () => {
    const flickrId = "123456789"
    let imageInformation = getDummyImageInformation()
    imageInformation.id = flickrId

    const caption = "Test 1234 <PHOTO_ID>"
    const resolvedCaption = resolvePlaceholdersInCaption(caption, imageInformation)
    const expectedCaption = `Test 1234 ${flickrId}`

    expect(resolvedCaption).toEqual(expectedCaption)
})

test("when the placeholder <PHOTO_TITLE> was specified in the caption, then it should be resolved", () => {
    const imageInformation: ImageInformation = require(`${getFixturesFolderPath()}/16by9.json`)

    const caption = "Test 1234 <PHOTO_TITLE>"
    const resolvedCaption = resolvePlaceholdersInCaption(caption, imageInformation)
    const expectedCaption = `Test 1234 ${imageInformation.title}`

    expect(resolvedCaption).toEqual(expectedCaption)
})
