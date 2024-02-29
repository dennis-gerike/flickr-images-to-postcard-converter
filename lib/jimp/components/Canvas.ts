import * as fs from "fs/promises"
import Jimp from "jimp"
import {Photo} from "./Photo"
import {Caption} from "./Caption"
import {Component} from "./Component"

/**
 * A component that is meant as a container for other components.
 */
export class Canvas extends Component {
    private aspectRatio: number = 1
    private horizontalMarginPercentage: number = 0
    private verticalMarginPercentage: number = 0

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

    public setHorizontalMarginPercentage(horizontal: number) {
        this.horizontalMarginPercentage = horizontal
    }

    public getHorizontalMarginPercentage() {
        return this.horizontalMarginPercentage
    }

    public setVerticalMarginPercentage(vertical: number) {
        this.verticalMarginPercentage = vertical
    }

    public getVerticalMarginPercentage() {
        return this.verticalMarginPercentage
    }

    /**
     * Renders the photo onto the canvas.
     * The caller has to provide the correct coordinates, so the photo is correctly positioned on the canvas.
     */
    public applyPhoto(photo: Photo, x: number, y: number) {
        this.layer.composite(photo.getLayer(), x, y, {
            mode: Jimp.BLEND_SOURCE_OVER,
            opacitySource: 1,
            opacityDest: 1,
        })
    }

    /**
     * Renders the caption text onto the canvas.
     * The caller has to provide the correct coordinates, so the text is correctly positioned on the canvas.
     */
    public async applyCaption(caption: Caption, x: number, y: number) {
        // rendering the caption (until now we only manipulated the empty layer)
        await caption.applyText()

        // rendering the caption onto the canvas
        this.layer.composite(caption.getLayer(), x, y, {
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
        await this.layer.writeAsync(`${path}/${fileName}`)
    }
}
