export function resolvePlaceholdersInCaption(templateText: string) {
    return templateText
        .replace('<PHOTO_ID>', process.env.FLICKR_IMAGE_ID as string)
}
