import {getAlbumId} from "../../../lib/converter/getAlbumId"
import {EnvironmentVariables} from "../../../lib/converter/types/EnvironmentVariables"

test('when photo album id is NOT set, then null should be returned', async () => {
    delete process.env[EnvironmentVariables.FLICKR_ALBUM_ID]

    const photoAlbumId = getAlbumId()
    expect(photoAlbumId).toBeNull()
})

test('when photo album id IS set, then the id should be returned', async () => {
    process.env[EnvironmentVariables.FLICKR_ALBUM_ID] = '98765'

    const photoAlbumId = getAlbumId()
    expect(photoAlbumId).not.toBeNull()
    expect(photoAlbumId).toBe('98765')
})

test('when photo album id is set, but with an EMPTY string, then null should be returned', async () => {
    process.env[EnvironmentVariables.FLICKR_ALBUM_ID] = ''

    const photoAlbumId = getAlbumId()
    expect(photoAlbumId).toBeNull()
})
