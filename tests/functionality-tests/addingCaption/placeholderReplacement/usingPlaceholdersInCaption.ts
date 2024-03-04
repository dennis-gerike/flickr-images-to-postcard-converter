import {resolvePlaceholdersInCaption} from "../../../../lib/converter/resolvePlaceholdersInCaption"

test("when no placeholders were specified, then the caption should not change", async () => {
    const caption = "Test 1234"
    const resolvedCaption = resolvePlaceholdersInCaption(caption)

    expect(resolvedCaption).toEqual(caption)
})
