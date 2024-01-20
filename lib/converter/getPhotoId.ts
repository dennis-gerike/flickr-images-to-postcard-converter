export function getPhotoId() {
    if (process.env.FLICKR_IMAGE_ID) {
        return process.env.FLICKR_IMAGE_ID
    }

    return null
}