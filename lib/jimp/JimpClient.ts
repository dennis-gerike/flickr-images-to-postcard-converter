import Jimp from "jimp"
import fs from "fs/promises"

export class JimpClient {
    private canvas: Jimp
    private aspectRatio: number = 1 // e.g.: "1.5" equals "3:2" and "1.777777" equals "16:9"
    private canvasImageWidth: number = 256
    private canvasImageHeight: number = this.canvasImageWidth / this.aspectRatio

    private image: Jimp | undefined

    constructor() {
        this.canvas = new Jimp(
            this.canvasImageWidth,
            this.canvasImageHeight,
            0xfff000ff
        )
    }

    /**
     * Sets or replaces the current image.
     * The path can be relative or absolute.
     * The path must point to a valid (and supported) image file.
     */
    public async setImage(path: string) {
        this.image = await Jimp.read(path)
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
     * Applies all filters, then saves the produced image at the given path.
     */
    public async saveProcessedImage(targetPath: string, targetFile: string) {
        this.applyAllFilters()

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
        if (this.image) {
            this.canvasImageWidth = this.image.getWidth()
            this.canvasImageHeight = this.image.getWidth() / this.aspectRatio
            this.canvas.contain(this.canvasImageWidth, this.canvasImageHeight)
        }
    }

    /**
     * Paints the image onto the canvas.
     */
    private applyAllFilters() {
        if (this.image) {
            this.canvas.composite(this.image, 0, 0, {
                mode: Jimp.BLEND_SOURCE_OVER,
                opacitySource: 1,
                opacityDest: 1,
            })
        }
    }
}
