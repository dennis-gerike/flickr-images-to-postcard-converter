import Jimp from "jimp"
import fs from "fs/promises"

export class JimpClient {
    private canvas: Jimp
    private aspectRatio: number = 1 // e.g.: "1.5" equals "3:2" and "1.777777" equals "16:9"

    private photo: Jimp | undefined

    private textBox: Jimp | undefined
    private textBoxText: string = ""
    private textBoxHeightPercentage: number = 20

    constructor() {
        this.canvas = new Jimp(
            256,
            256 / this.aspectRatio,
            0xffffffff
        )
    }

    /**
     * Sets or replaces the current photo.
     * The path can be relative or absolute.
     * The path must point to a valid (and supported) image file.
     */
    public async setPhoto(path: string) {
        this.photo = await Jimp.read(path)
        this.resizeCanvasToCoverAllLayers()
    }

    /**
     * Changes the dimensions of the canvas to match the new aspect ratio,
     * whilst taking into account the dimensions of the image.
     */
    public setAspectRatio(ratio: number) {
        this.aspectRatio = ratio
        this.resizeCanvasToCoverAllLayers()
    }

    /**
     * Adds a layer, which is responsible to print the given text onto the image.
     * The text box is always located at the bottom, spanning the whole canvas.
     * The height of the box can be adjusted via the "heightPercentage" parameter.
     * Only one text box layer can exist at a time.
     * Calling this function multiple times will override any existing text box.
     */
    public async setTextBox(text: string, heightPercentage: number) {
        this.textBoxText = text
        this.textBoxHeightPercentage = heightPercentage

        // Because the Jimp fonts are no vector graphics, but bitmaps we have to manually control the font size.
        // We use a reference layer here, write the text onto it and then scale the whole layer up/down to the canvas size.
        // This way, the (absolute) font size will stay the same for each photo - no matter if it is a big 4K image or just a small 720p image.
        const referenceWidth = 4000
        const referenceHeight = 400

        // creating the new layer with the reference dimensions (or override the existing one)
        this.textBox = new Jimp(
            referenceWidth,
            referenceHeight,
            0xffffffff
        )

        // printing the requested text onto the layer
        const font = await Jimp.loadFont(Jimp.FONT_SANS_128_BLACK)
        this.textBox.print(font, 0, 0, {
                text: text,
                alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
                alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
            },
            referenceWidth,
            referenceHeight
        )

        // now, scaling the layer up/down to match the canvas size
        const targetHeight = this.canvas.getHeight() * heightPercentage / 100
        this.textBox.resize(this.canvas.getWidth(), Jimp.AUTO)

        // and finally cutting the height down to the user requested value
        this.textBox.contain(this.canvas.getWidth(), targetHeight)

        this.resizeCanvasToCoverAllLayers()
    }

    /**
     * Renders all layers onto the canvas, then saves the produced image at the given path.
     */
    public async saveProcessedImage(targetPath: string, targetFile: string) {
        await this.applyAllLayers()

        await fs.mkdir(`${targetPath}/`, {recursive: true})

        this.canvas.write(`${targetPath}/${targetFile}`)
    }

    /**
     * Increases or decreases the dimensions of the canvas, so it can house the currently selected photo and the text box.
     * This does NOT render the photo or the text box onto the canvas, yet.
     * We just reserve the space for the future.
     * The calculations consider the selected aspect ratio and make sure the image would not be accidentally cropped
     * or resized -> we want to keep every pixel of the original photo.
     */
    private resizeCanvasToCoverAllLayers() {
        if (this.photo) {
            if (this.photoIsWidescreen()) {
                this.canvas.resize(
                    this.photo.getWidth(),
                    this.photo.getWidth() / this.aspectRatio
                )
            } else {
                if (this.textBox) {
                    this.canvas.resize(
                        (this.photo.getHeight() + this.textBox.getHeight()) * this.aspectRatio,
                        this.photo.getHeight() + this.textBox.getHeight()
                    )
                } else {
                    this.canvas.resize(
                        this.photo.getHeight() * this.aspectRatio,
                        this.photo.getHeight()
                    )
                }
            }
        }
    }

    /**
     * Determines if the selected photo has a widescreen format or not.
     * Widescreen means: the photo fills the canvas completely in horizontal direction - maybe leaving empty space above and/or below.
     * Not widescreen means: the photo fills the canvas completely in vertical direction - maybe leaving empty space left and/or right.
     * The calculation takes into account that the optional text box may change the available space for the photo on the canvas (photo and text box have to share the space).
     */
    private photoIsWidescreen() {
        if (this.photo) {
            let virtualWidth = this.photo.getWidth()
            let virtualHeight = this.photo.getHeight()
            if (this.textBox) {
                virtualHeight += this.textBox.getHeight()
            }
            let virtualAspectRatio = virtualWidth / virtualHeight

            return virtualAspectRatio > this.aspectRatio
        }

        return true
    }

    /**
     * Renders the image and the text box onto the canvas.
     */
    private async applyAllLayers() {
        if (this.textBox) { // TODO: text box size is not correctly applied the first time
            await this.setTextBox(this.textBoxText, this.textBoxHeightPercentage)
            await this.setTextBox(this.textBoxText, this.textBoxHeightPercentage)
        }

        if (this.photo) {
            let x = 0
            if (!this.photoIsWidescreen()) {
                x = (this.canvas.getWidth() - this.photo.getWidth()) / 2
            }
            this.canvas.composite(this.photo, x, 0, {
                mode: Jimp.BLEND_SOURCE_OVER,
                opacitySource: 1,
                opacityDest: 1,
            })
        }

        if (this.textBox) {
            const y = this.canvas.getHeight() * ((100 - this.textBoxHeightPercentage) / 100)
            this.canvas.composite(this.textBox, 0, y, {
                mode: Jimp.BLEND_SOURCE_OVER,
                opacitySource: 1,
                opacityDest: 1,
            })
        }
    }
}
