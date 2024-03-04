import {resolvePlaceholdersInCaption} from "../../../../lib/converter/resolvePlaceholdersInCaption"

test("when no placeholders were specified, then the caption should not change", () => {
    const caption = "Test 1234"
    const resolvedCaption = resolvePlaceholdersInCaption(caption)

    expect(resolvedCaption).toEqual(caption)
})

test("when an unknown placeholder was specified, then the caption should not change", () => {
    const caption = "Test 1234 <BLUBB>"
    const resolvedCaption = resolvePlaceholdersInCaption(caption)

    expect(resolvedCaption).toEqual(caption)
})

test("when the placeholder <FLICKR_ID> was specified in the caption, then it should be resolved", () => {
    const flickrId = "123456789"
    process.env.FLICKR_IMAGE_ID = flickrId

    const caption = "Test 1234 <FLICKR_ID>"
    const resolvedCaption = resolvePlaceholdersInCaption(caption)
    const expectedCaption = `Test 1234 ${flickrId}`

    expect(resolvedCaption).toEqual(expectedCaption)
})
