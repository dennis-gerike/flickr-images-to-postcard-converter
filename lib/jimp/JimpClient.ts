import Jimp from "jimp"
import fs from "fs/promises"

export class JimpClient {
    private image: Jimp
    private aspectRatio: number = 1.5 // "1.5" equals "3:2"; "1.777777" equals "16:9"
    private originalImageWidth: number = 256
    private originalImageHeight: number = this.originalImageWidth / this.aspectRatio

    constructor() {
        this.image = new Jimp(
            this.originalImageWidth,
            this.originalImageHeight,
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
        this.originalImageWidth = this.image.getWidth()
        this.originalImageHeight = this.image.getHeight()
        this.applyAspectRatio()
    }

    public setAspectRatio(ratio: number) {
        this.aspectRatio = ratio
        this.applyAspectRatio()
    }

    public async saveProcessedImage(targetPath: string, targetFile: string) {
        await fs.mkdir(`${targetPath}/`, {recursive: true})

        this.image.write(`${targetPath}/${targetFile}`)
    }

    private applyAspectRatio() {
        const finalWidth = this.originalImageWidth
        const finalHeight = this.originalImageWidth / this.aspectRatio

        this.image.contain(
            finalWidth,
            finalHeight,
            Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE
        )
    }
}
