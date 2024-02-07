export function getAspectRatio(): number | null {
    const aspectRatio = process.env.ASPECT_RATIO

    if (typeof aspectRatio === undefined || aspectRatio === '') {
        return null
    }

    return Number(aspectRatio)
}
