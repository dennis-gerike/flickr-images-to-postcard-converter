import {resolvePlaceholdersInCaption} from "../../../../lib/converter/resolvePlaceholdersInCaption"

test("when no placeholders were specified, then the caption should not change", async () => {
    const caption = "Test 1234"
    const resolvedCaption = resolvePlaceholdersInCaption(caption)

    expect(resolvedCaption).toEqual(caption)
})

test("when an unknown placeholder was specified, then the caption should not change", async () => {
    const caption = "Test 1234 <BLUBB>"
    const resolvedCaption = resolvePlaceholdersInCaption(caption)

    expect(resolvedCaption).toEqual(caption)
})