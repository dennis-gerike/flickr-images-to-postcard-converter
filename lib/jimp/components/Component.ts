import Jimp from "jimp"
import {ComponentOptions} from "../types/ComponentOptions";

export class Component {
    protected layer: Jimp
    protected width: number = 256
    protected height: number = 256
    protected backgroundColor = 0xffffffff

    constructor(options?: ComponentOptions) {
        this.layer = new Jimp(
            options?.width ?? this.width,
            options?.height ?? this.height,
            options?.backgroundColor ?? this.backgroundColor,
        )
    }

    public getWidth() {
        return this.width
    }

    public getHeight() {
        return this.height
    }

    public resize(width: number, height: number) {
        this.layer.resize(width, height)
        this.width = width
        this.height = height
    }

    public getLayer() {
        return this.layer
    }
}
