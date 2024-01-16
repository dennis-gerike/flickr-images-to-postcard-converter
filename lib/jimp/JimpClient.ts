import {Canvas} from "./components/Canvas"
import {Photo} from "./components/Photo"
import {TextBox} from "./components/TextBox"
import {TextBoxOptions} from "./types/TextBoxOptions";

export class JimpClient {
    private canvas: Canvas
    private photo: Photo
    private textBox: TextBox

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
        if (ratio && ratio > 0) {
            this.canvas.setAspectRatio(ratio)
        } else {
            console.warn('Invalid aspect ratio provided! Using default value instead.')
            this.canvas.setAspectRatio(1)
        }
    }

    /**
     * Adds horizontal and/or vertical margins around the image.
     * The percentages are NOT added on top, they are calculated as part of the whole image.
     * This will NOT change the aspect ratio of the final image.
     * Example:
     *   Given an image with 1140x570 pixel
     *   When adding a 5 percent margin
     *   Then the image dimensions will be 1200x600 pixel
     *   And the image will have a left margin of 30 pixel
     *   And the image will have a right margin of 30 pixel
     *   And the image will have a top margin of 15 pixel
     *   And the image will have a bottom margin of 15 pixel
     */
    public setMargin(horizontal: number, vertical: number) {
        this.canvas.setHorizontalMarginPercentage(horizontal)
        this.canvas.setVerticalMarginPercentage(vertical)
    }

    /**
     * Sets or replaces the current text box.
     * Only one text box can exist at a time.
     * The text box is always spanning the whole canvas horizontally.
     * Text, color and margins can be configured via the options object.
     */
    public async setTextBox(options: TextBoxOptions) {
        await this.textBox.setText(options.text)
        await this.textBox.setTextColor(options.red ?? 0, options.green ?? 0, options.blue ?? 0)
        this.textBox.setRelativeHeight(options.relativeHeight)
        this.textBox.setRelativeVerticalBuffer(options?.relativeVerticalBuffer ?? 0)
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
        let totalWidth = photoWidth / (1 - this.canvas.getHorizontalMarginPercentage() / 100)
        let marginWidth = totalWidth - photoWidth
        let photoHeight = this.photo.getHeight()
        let totalHeight = totalWidth / this.canvas.getAspectRatio()
        let textBoxHeight = totalHeight * this.textBox.getRelativeHeight() / 100
        let textBoxMarginHeight = totalHeight * this.textBox.getRelativeVerticalBuffer() / 100
        let marginHeight = totalHeight * this.canvas.getVerticalMarginPercentage() / 100

        // How much space is left between photo and text box?
        const verticalBuffer = totalHeight - photoHeight - textBoxHeight - textBoxMarginHeight - marginHeight

        // 2. Validating our assumption
        // When the vertical buffer is positive, then there is space between photo and text box and our assumption was correct.
        // When the vertical buffer is negative, then photo and text box would overlap and our assumption was wrong.
        //   In that case we need to flip the calculations -> they need to be based on the HEIGHT of the PHOTO.
        if (verticalBuffer < 0) {
            totalHeight = photoHeight / (1 - ((this.textBox.getRelativeHeight() + this.textBox.getRelativeVerticalBuffer() + this.canvas.getVerticalMarginPercentage()) / 100))
            totalWidth = totalHeight * this.canvas.getAspectRatio()
            marginWidth = totalWidth * this.canvas.getHorizontalMarginPercentage() / 100
            textBoxHeight = totalHeight * this.textBox.getRelativeHeight() / 100
            marginHeight = totalHeight * this.canvas.getVerticalMarginPercentage() / 100
        }

        // 3. resizing all components based on the previous calculations
        this.textBox.resize(totalWidth - marginWidth, textBoxHeight)
        this.canvas.resize(totalWidth, totalHeight)

        // 4. rendering all components to the canvas
        this.canvas.applyPhoto(this.photo, (totalWidth - photoWidth) / 2, marginHeight / 2)
        await this.canvas.applyTextBox(this.textBox, marginWidth / 2, totalHeight - textBoxHeight - marginHeight / 2)
    }
}
