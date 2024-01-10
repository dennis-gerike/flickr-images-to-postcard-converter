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
     * This will not change the aspect ratio of the image.
     * Example:
     *   Given an image with 1000x600 pixel
     *   When adding a 5 percent margin
     *   Then the image dimensions will be 1050x630 pixel
     *   And the image will have a left margin of 25 pixel
     *   And the image will have a right margin of 25 pixel
     *   And the image will have a top margin of 15 pixel
     *   And the image will have a bottom margin of 15 pixel
     */
    public setMargin(percentage: number) {
        this.canvas.setMargin(percentage)
    }

    /**
     * Sets or replaces the current text box.
     * Only one text box layer can exist at a time.
     * The text box is always spanning the whole canvas horizontally.
     * The height of the box can be adjusted via the "heightPercentage" parameter.
     */
    public async setTextBox(text: string, heightPercentage: number) {
        await this.textBox.setText(text)
        this.textBoxHeightPercentage = heightPercentage
    }

    /**
     * Renders all components onto the canvas, then saves the produced image at the given path.
     */
    public async saveProcessedImage(targetPath: string, targetFile: string) {
        await this.renderAndResizeAllComponents()
        this.applyAllComponents()
        await this.canvas.save(targetPath, targetFile)
    }

    private async renderAndResizeAllComponents() {
        // expanding the canvas, so the photo is embedded perfectly (either horizontally or vertically)
        if (this.isPhotoWidescreen()) {
            this.canvas.resize(
                this.photo.getWidth(),
                this.photo.getWidth() / this.canvas.getAspectRatio()
            )
        } else {
            this.canvas.resize(
                this.photo.getHeight() * this.canvas.getAspectRatio(),
                this.photo.getHeight()
            )
        }

        // resizing the text box to match the canvas width
        this.textBox.resize(
            this.canvas.getWidth(),
            this.canvas.getHeight() * this.textBoxHeightPercentage / 100
        )

        // the canvas might need to be expanded to fit the image AND the text box together (without them overlapping)
        if (!this.isPhotoAndTextBoxWidescreen()) {
            this.canvas.resize(
                (this.photo.getHeight() + this.textBox.getHeight()) * this.canvas.getAspectRatio(),
                this.photo.getHeight() + this.textBox.getHeight()
            )

            this.textBox.resize(
                this.canvas.getWidth(),
                this.canvas.getHeight() * this.textBoxHeightPercentage / 100
            )
        }

        // rendering the text (until now we only manipulated the empty layer)
        await this.textBox.applyText()
    }

    private applyAllComponents() {
        // calculating the positions of the photo and the text box before the canvas is resized (just to make the calculations a bit easier)
        const photoPositionX = (this.canvas.getWidth() - this.photo.getWidth()) / 2
        const textBoxPositionY = this.canvas.getHeight() * ((100 - this.textBoxHeightPercentage) / 100)

        // resizing the canvas to include the specified margins
        this.canvas.applyMargin()

        // render the photo to the canvas
        this.canvas.applyPhoto(
            this.photo,
            photoPositionX,
            0
        )

        // render the text to the canvas
        this.canvas.applyTextBox(
            this.textBox,
            0,
            textBoxPositionY
        )
    }

    /**
     * Determines if the selected photo has a widescreen format or not.
     * Widescreen means: the photo fills the canvas completely in horizontal direction - maybe leaving empty space above and/or below.
     * Not widescreen means: the photo fills the canvas completely in vertical direction - maybe leaving empty space left and/or right.
     */
    private isPhotoWidescreen() {
        let virtualWidth = this.photo.getWidth()
        let virtualHeight = this.photo.getHeight()
        let virtualAspectRatio = virtualWidth / virtualHeight

        return virtualAspectRatio > this.canvas.getAspectRatio()
    }

    /**
     * The same as "isPhotoWidescreen", but takes into account that the optional text box may change the available space for the photo on the canvas (photo and text box have to share the space).
     */
    private isPhotoAndTextBoxWidescreen() {
        let virtualWidth = this.photo.getWidth()
        let virtualHeight = this.photo.getHeight() + this.textBox.getHeight()
        let virtualAspectRatio = virtualWidth / virtualHeight

        return virtualAspectRatio > this.canvas.getAspectRatio()
    }
}
