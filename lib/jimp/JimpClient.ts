import Jimp from "jimp"
import fs from "fs/promises"

export class JimpClient {
    private image: Jimp

    constructor() {
        this.image = new Jimp(256, 256, 0xfff000ff)
    }

    /**
     * Sets or replaces the current image.
     * The path can be relative or absolute.
     * The path must point to a valid (and supported) image file.
     */
    public async setImage(path: string) {
        this.image = await Jimp.read(path)
    }

    public async saveProcessedImage(targetPath: string, targetFile: string) {
        await fs.mkdir(`${targetPath}/`, {recursive: true})

        this.image.write(`${targetPath}/${targetFile}`)
    }
}
