import fs from "fs/promises"

export async function createFailuresFolderPath() {
    await fs.mkdir(`${__dirname}/../_data/failures/`, {recursive: true})
}
