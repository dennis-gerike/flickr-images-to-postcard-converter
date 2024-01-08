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

    public applyPhoto(photo: Photo, x: number, y: number) {
        this.layer.composite(photo.getLayer(), x, y, {
            mode: Jimp.BLEND_SOURCE_OVER,
            opacitySource: 1,
            opacityDest: 1,
        })
    }

    public applyTextBox(textBox: TextBox, x: number, y: number) {
        this.layer.composite(textBox.getLayer(), x, y, {
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
}
