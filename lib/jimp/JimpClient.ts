import Jimp from "jimp"
import fs from "fs/promises"

export class JimpClient {
    private image: Jimp

    constructor() {
        this.image = new Jimp(256, 256, 0xfff000ff)
    }

    public async saveProcessedImage(targetPath: string, targetFile: string) {
        await fs.mkdir(`${targetPath}/`, {recursive: true})

        this.image.write(`${targetPath}/${targetFile}`)
    }
}
