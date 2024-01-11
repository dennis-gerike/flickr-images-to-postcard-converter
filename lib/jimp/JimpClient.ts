import {Canvas} from "./components/Canvas"
import {Photo} from "./components/Photo"
import {TextBox} from "./components/TextBox"

export class JimpClient {
    private canvas: Canvas
    private photo: Photo
    private textBox: TextBox
    private textBoxHeightPercentage: number = 20

    constructor() {
        this.canvas = new Canvas()
        this.photo = new Photo()
        this.textBox = new TextBox()
    }

    /**
     * Sets or replaces the current photo.
     * Only one photo can exist at a time.
     * The path can be relative or absolute.
     * The path must point to a valid (and supported) image file.
     */
    public async setPhoto(path: string) {
        await this.photo.load(path)
    }

    /**
     * Changes the dimensions of the canvas to the given aspect ratio.
     */
    public setAspectRatio(ratio: number) {
        this.canvas.setAspectRatio(ratio)
    }

    /**
     * Adds a margin around the whole image.
     * The value will be applied as a percentage of the current image dimensions.
     * This will NOT change the aspect ratio of the final image.
     * Example:
     *   Given an image with 1000x600 pixel
     *   When adding a 5 percent margin
     *   Then the image dimensions will be 1050x630 pixel
     *   And the image will have a left margin of 25 pixel
     *   And the image will have a right margin of 25 pixel
     *   And the image will have a top margin of 15 pixel
     *   And the image will have a bottom margin of 15 pixel
     */
    public setMargin(horizontal: number, vertical: number) {
        this.canvas.setHorizontalMarginPercentage(horizontal)
        this.canvas.setVerticalMarginPercentage(vertical)
    }

    /**
     * Sets or replaces the current text box.
     * Only one text box layer can exist at a time.
     * The text box is always spanning the whole canvas horizontally.
     * The height of the box can be adjusted via the "heightPercentage" parameter.
     * The color of the text can be adjusted by changing the red, green and blue values.
     */
    public async setTextBox(text: string, heightPercentage: number, red: number = 0, green: number = 0, blue: number = 0) {
        await this.textBox.setText(text, red, green, blue)
        this.textBoxHeightPercentage = heightPercentage
    }

    /**
     * Renders all components onto the canvas, then saves the produced image at the given path.
     */
    public async saveProcessedImage(targetPath: string, targetFile: string) {
        await this.renderAllComponents()
        await this.canvas.save(targetPath, targetFile)
    }

    /**
     * Creates a fresh canvas, removing anything that might have been rendered on it before.
     */
    public resetCanvas() {
        this.canvas = new Canvas()
    }

    /**
     * Calculates the dimensions of all elements and then renders them onto the canvas.
     * Takes into account the specified margins and aspect ratio for the final image.
     * Makes sure, that photo and text box don't overlap.
     * Also makes sure, that the photo element itself is not cropped, stretched or squeezed in any way.
     * We want to keep every pixel of the original image in the final image.
     */
    private async renderAllComponents() {
        // 1. Assumption: the arrangement of all elements leads to a photo that is rendered in
        // widescreen mode (no borders left and right, but potential above and below).
        // Under this assumption all calculations are based on the WIDTH of the PHOTO.
        let photoWidth = this.photo.getWidth()
        let marginWidth = this.photo.getWidth() * this.canvas.getHorizontalMarginPercentage() / 100
        let photoHeight = this.photo.getHeight()
        let textBoxHeight = photoHeight * this.textBoxHeightPercentage / 100
        let marginHeight = photoHeight * this.canvas.getVerticalMarginPercentage() / 100

        // How large would the final image be?
        let totalWidth = photoWidth + marginWidth
        let totalHeight = totalWidth / this.canvas.getAspectRatio()

        // How much space is left between photo and text box?
        const verticalBuffer = totalHeight - photoHeight - textBoxHeight - marginHeight

        // 2. Validating our assumption
        // When the vertical buffer is positive, then there is space between photo and text box and our assumption was correct.
        // When the vertical buffer is negative, then photo and text box would overlap and our assumption was wrong.
        //   In that case we need to flip the calculations -> they need to be based on the HEIGHT of the PHOTO.
        if (verticalBuffer < 0) {
            totalHeight = photoHeight + textBoxHeight + marginHeight
            totalWidth = totalHeight * this.canvas.getAspectRatio()
        }

        // 3. resizing all components based on the previous calculations
        this.textBox.resize(totalWidth - marginWidth, textBoxHeight)
        this.canvas.resize(totalWidth, totalHeight)

        // 4. rendering all components to the canvas
        this.canvas.applyPhoto(this.photo, (totalWidth - photoWidth) / 2, marginHeight / 2)
        await this.canvas.applyTextBox(this.textBox, marginWidth / 2, totalHeight - textBoxHeight - marginHeight / 2)
    }
}
