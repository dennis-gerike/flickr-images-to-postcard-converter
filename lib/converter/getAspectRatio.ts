export function getAspectRatio(): number | null {
    const aspectRatio = process.env.ASPECT_RATIO

    if (!aspectRatio) {
        return null
    }

    return Number(aspectRatio)
}
