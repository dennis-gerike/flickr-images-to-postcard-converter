import {resolvePlaceholdersInCaption} from "../../../lib/converter/resolvePlaceholdersInCaption"
import {getFixturesFolderPath} from "../_helper/getFixturesFolderPath"
import {ImageInformation} from "../../../lib/flickr/types/internal/ImageInformation"

function getDummyImageInformation(): ImageInformation {
    return {id: "", title: "", url: ""}
}

test("there should not happen any replacements when no placeholder was specified", () => {
    const caption = "Test 1234"
    const resolvedCaption = resolvePlaceholdersInCaption(caption, getDummyImageInformation())

    expect(resolvedCaption).toEqual(caption)
})

test("unknown placeholders should be ignored and not be replaced", () => {
    const caption = "Test 1234 <BLUBB>"
    const resolvedCaption = resolvePlaceholdersInCaption(caption, getDummyImageInformation())

    expect(resolvedCaption).toEqual(caption)
})

test("the placeholder PHOTO_ID should be resolved", () => {
    const flickrId = "123456789"
    let imageInformation = getDummyImageInformation()
    imageInformation.id = flickrId

    const caption = "Test 1234 <PHOTO_ID>"
    const resolvedCaption = resolvePlaceholdersInCaption(caption, imageInformation)
    const expectedCaption = `Test 1234 ${flickrId}`

    expect(resolvedCaption).toEqual(expectedCaption)
})

test("the placeholder PHOTO_TITLE should be resolved", () => {
    const imageInformation: ImageInformation = require(`${getFixturesFolderPath()}/16by9.json`)

    const caption = "Test 1234 <PHOTO_TITLE>"
    const resolvedCaption = resolvePlaceholdersInCaption(caption, imageInformation)
    const expectedCaption = `Test 1234 ${imageInformation.title}`

    expect(resolvedCaption).toEqual(expectedCaption)
})

test("multiple placeholders should be resolved", () => {
    const flickrId = "123456789"
    let imageInformation = getDummyImageInformation()
    imageInformation.id = flickrId

    const caption = "Test - <PHOTO_ID> - <PHOTO_TITLE>"
    const resolvedCaption = resolvePlaceholdersInCaption(caption, imageInformation)
    const expectedCaption = `Test - ${flickrId} - ${imageInformation.title}`

    expect(resolvedCaption).toEqual(expectedCaption)
})
