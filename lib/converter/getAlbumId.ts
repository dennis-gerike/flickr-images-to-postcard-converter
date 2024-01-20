export function getAlbumId() {
    if (process.env.FLICKR_ALBUM_ID) {
        return process.env.FLICKR_ALBUM_ID
    }

    return null
}
