export function determineImageFileName(photoId: string) {
    const defaultFileName = "undefined.jpg"

    if (photoId === "") {
        return defaultFileName
    }

    return `${photoId}.jpg`
}
