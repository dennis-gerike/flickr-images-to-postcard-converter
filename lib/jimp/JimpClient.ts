import Jimp from "jimp"
import fs from "fs/promises"

export class JimpClient {
    private canvas: Jimp
    private aspectRatio: number = 1 // e.g.: "1.5" equals "3:2" and "1.777777" equals "16:9"

    private photo: Jimp | undefined

    private textBox: Jimp | undefined
    private textBoxText: string = "";
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
        this.resizeCanvasToMatchImageDimensions()
    }

    /**
     * Changes the dimensions of the canvas to match the new aspect ratio,
     * whilst taking into account the dimensions of the image.
     */
    public setAspectRatio(ratio: number) {
        this.aspectRatio = ratio
        this.resizeCanvasToMatchImageDimensions()
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
    }

    /**
     * Renders all layers onto the canvas, then saves the produced image at the given path.
     */
    public async saveProcessedImage(targetPath: string, targetFile: string) {
        this.applyAllLayers()

        await fs.mkdir(`${targetPath}/`, {recursive: true})

        this.canvas.write(`${targetPath}/${targetFile}`)
    }

    /**
     * Increases or decreases the dimensions of the canvas to match the size of the currently selected image.
     * The image is NOT yet rendered to the canvas, we just reserve the space for the future.
     * The calculation considers the selected aspect ratio and make sure the image would not be accidentally cropped.
     */
    private resizeCanvasToMatchImageDimensions() {
        // TODO: the current logic only works for widescreen image, portrait images will be cropped
        if (this.photo) {
            this.canvasImageWidth = this.photo.getWidth()
            this.canvasImageHeight = this.photo.getWidth() / this.aspectRatio
            this.canvas.contain(this.canvasImageWidth, this.canvasImageHeight)
        }
    }

    /**
     * Renders the image and the text box onto the canvas.
     */
    private applyAllLayers() {
        if (this.photo) {
            this.canvas.composite(this.photo, 0, 0, {
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
