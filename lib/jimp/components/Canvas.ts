import * as fs from "fs/promises"
import Jimp from "jimp"
import {Photo} from "./Photo"
import {TextBox} from "./TextBox"
import {Component} from "./Component"

/**
 * A component that is meant as a container for other components.
 */
export class Canvas extends Component {
    private aspectRatio: number = 1
    private marginPercentage: number = 0

    constructor() {
        super({
            width: 256,
            height: 256,
        })
    }

    public setAspectRatio(ratio: number) {
        this.aspectRatio = ratio
    }

    public getAspectRatio() {
        return this.aspectRatio
    }

    public setMargin(percentage: number) {
        this.marginPercentage = percentage
    }

    /**
     * Calculates the necessary space for the margin and resizes the canvas accordingly.
     */
    public applyMargin() {
        this.resize(
            this.getWidth() * (1 + this.marginPercentage / 100),
            this.getHeight() * (1 + this.marginPercentage / 100)
        )
    }

    /**
     * Renders the photo onto the canvas.
     * The final position on the canvas will be influenced by the given values and the calculated margins.
     */
    public applyPhoto(photo: Photo, x: number, y: number) {
        this.layer.composite(photo.getLayer(), x + this.getHorizontalMargin() / 2, y + this.getVerticalMargin() / 2, {
            mode: Jimp.BLEND_SOURCE_OVER,
            opacitySource: 1,
            opacityDest: 1,
        })
    }

    /**
     * Renders the text onto the canvas.
     * The final position on the canvas will be influenced by the given values and the calculated margins.
     */
    public applyTextBox(textBox: TextBox, x: number, y: number) {
        this.layer.composite(textBox.getLayer(), x + this.getHorizontalMargin() / 2, y + this.getVerticalMargin() / 2, {
            mode: Jimp.BLEND_SOURCE_OVER,
            opacitySource: 1,
            opacityDest: 1,
        })
    }

    /**
     * Saves the current canvas as an image file to the disk.
     * If the given folder path does not exist it will be created automatically.
     * If the "apply*()" functions were not called before, then the image will be blank.
     */
    public async save(path: string, fileName: string) {
        await fs.mkdir(`${path}/`, {recursive: true})
        this.layer.write(`${path}/${fileName}`)
    }

    /**
     * Calculates the total margin width in pixel.
     * Returns the sum of the left and the right margin.
     * Assumes that the margin was already applied to the layer, else this function will produce wrong numbers.
     */
    private getHorizontalMargin() {
        const canvasWidthWithMargin = this.layer.getWidth()
        const canvasWidthWithoutMargin = canvasWidthWithMargin / (1 + this.marginPercentage / 100)

        return canvasWidthWithMargin - canvasWidthWithoutMargin
    }

    /**
     * Calculates the total margin height in pixel.
     * Returns the sum of the top and the bottom margin.
     * Assumes that the margin was already applied to the layer, else this function will produce wrong numbers.
     */
    private getVerticalMargin() {
        const canvasHeightWithMargin = this.layer.getHeight()
        const canvasHeightWithoutMargin = canvasHeightWithMargin / (1 + this.marginPercentage / 100)

        return canvasHeightWithMargin - canvasHeightWithoutMargin
    }
}
