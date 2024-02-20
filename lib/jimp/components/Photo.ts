import Jimp from "jimp"
import {Component} from "./Component"

/**
 * A component that can handle an image file.
 */
export class Photo extends Component {
    constructor() {
        super();
    }

    /**
     * Loads the image at the given path.
     * The path needs to exist and be readable.
     * The image needs to be a valid image file (jpg, png, etc).
     */
    public async load(path: string) {
        try {
            this.layer = await Jimp.read(path)
        } catch (error) {
            throw new Error('Not able to load the given image file.')
        }
        this.width = this.layer.getWidth()
        this.height = this.layer.getHeight()
    }
}
