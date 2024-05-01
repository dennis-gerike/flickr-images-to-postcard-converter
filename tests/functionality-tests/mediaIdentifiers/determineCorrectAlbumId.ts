import {determineAlbumId} from "../../../lib/converter/determineAlbumId"
import {EnvironmentVariables} from "../../../lib/converter/types/EnvironmentVariables"

test('when no album id was configured then null should be determined', () => {
    delete process.env[EnvironmentVariables.FLICKR_ALBUM_ID]
    const determinedAlbumId = determineAlbumId()

    expect(determinedAlbumId).toBeNull()
})

test('when the album id is empty then null should be determined', () => {
    process.env[EnvironmentVariables.FLICKR_ALBUM_ID] = ""
    const determinedAlbumId = determineAlbumId()

    expect(determinedAlbumId).toBeNull()
})

test('a potentially valid album id should be determined correctly', () => {
    process.env[EnvironmentVariables.FLICKR_ALBUM_ID] = "9876543210"
    const determinedAlbumId = determineAlbumId()

    expect(determinedAlbumId).toEqual("9876543210")
})
