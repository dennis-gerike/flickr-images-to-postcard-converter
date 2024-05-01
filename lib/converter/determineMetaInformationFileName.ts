export function determineMetaInformationFileName(photoId: string) {
    const defaultFileName = "undefined.json"

    if (photoId === "") {
        return defaultFileName
    }

    return `${photoId}.json`
}
