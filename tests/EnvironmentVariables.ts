/**
 * This enumeration contains every environment variable that can be used to configure the application.
 *
 * This is a copy of the list which the app uses -> lib/converter/types/EnvironmentVariables.ts.
 * The reason is to separate the code from the tests, so potential breaking changes can be detected by the tests.
 */
export enum EnvironmentVariables {
    FLICKR_API_KEY = 'FLICKR_API_KEY',
    SOURCE_TYPE = 'SOURCE_TYPE',
    MEDIA_ID = 'MEDIA_ID',
    DOWNLOAD_PATH = 'DOWNLOAD_PATH',
    PROCESSED_PATH = 'PROCESSED_PATH',
    ASPECT_RATIO = 'ASPECT_RATIO',
    MARGIN_HORIZONTAL = 'MARGIN_HORIZONTAL',
    MARGIN_VERTICAL = 'MARGIN_VERTICAL',
    CUSTOM_TEXT = 'CUSTOM_TEXT',
    TEXT_COLOR = 'TEXT_COLOR',
    TEXT_VERTICAL_BUFFER = 'TEXT_VERTICAL_BUFFER',
}
