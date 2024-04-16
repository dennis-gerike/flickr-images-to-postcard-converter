import Jimp from "jimp"
import {Component} from "./Component"
import {ColorActionName} from "@jimp/plugin-color"

/**
 * A component that can manage text.
 */
export class Caption extends Component {
    private referenceLayer: Jimp
    private text: string = ""
    private fontColorRedAmount: number = 0
    private fontColorGreenAmount: number = 0
    private fontColorBlueAmount: number = 0
    private relativeHeight: number = 0
    private relativeVerticalBuffer: number = 0

    constructor() {
        super({
            width: 256,
            height: 1,
        })

        // Because the Jimp fonts are not vector graphics, but bitmaps we have to manually control the font size.
        // We use a reference layer here, writing the text onto it and then scale the whole layer up/down to the wanted size.
        // This way, the (absolute) font size will always stay the same, across all photos - no matter if it is a big 4K image or just a small 720p image.
        this.referenceLayer = new Jimp(
            6000,
            125,
        )
    }

    /**
     * Specifies the text that should be printed as caption.
     */
    public setText(text: string) {
        this.text = text
    }

    /**
     * Sets the color of the text by defining the red, green and blue values (RGB).
     */
    public setTextColor(red: number, green: number, blue: number) {
        this.fontColorRedAmount = red
        this.fontColorGreenAmount = green
        this.fontColorBlueAmount = blue
    }

    public setRelativeHeight(percentage: number) {
        this.relativeHeight = percentage
    }

    public getRelativeHeight() {
        return this.relativeHeight
    }

    public setRelativeVerticalBuffer(percentage: number) {
        this.relativeVerticalBuffer = percentage
    }

    public getRelativeVerticalBuffer() {
        return this.relativeVerticalBuffer
    }

    /**
     * Renders the specified text.
     */
    public async applyText() {
        // always starting off from the reference layer (see documentation in the constructor)
        this.layer = this.referenceLayer.clone()

        // printing the requested text onto the layer, using the standard Jimp font
        const font = await Jimp.loadFont('./lib/jimp/fonts/Merriweather/Black.ttf.fnt')
        this.layer.print(font, 0, 0, {
                text: this.text,
                alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
                alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
            },
            this.layer.getWidth(),
            this.layer.getHeight()
        )

        // changing the text color
        this.layer.color([{apply: ColorActionName.RED, params: [this.fontColorRedAmount]}])
        this.layer.color([{apply: ColorActionName.GREEN, params: [this.fontColorGreenAmount]}])
        this.layer.color([{apply: ColorActionName.BLUE, params: [this.fontColorBlueAmount]}])

        // now, scaling the layer up/down to match the requested width
        this.layer.resize(this.width, Jimp.AUTO)

        // and finally cutting the height down to the user requested value
        this.layer.contain(this.width, this.height)
    }
}
