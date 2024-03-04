export function resolvePlaceholdersInCaption(templateText: string) {
    let resolvedText = templateText.replace('<FLICKR_ID>', process.env.FLICKR_IMAGE_ID as string)

    return resolvedText
}
