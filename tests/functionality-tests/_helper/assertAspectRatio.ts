import assert from "assert"

export function assertAspectRatio(width: number, height: number, expectedAspectRatio: number, epsilon: number = 0.001) {
    const actualAspectRatio = width / height
    assert(Math.abs(expectedAspectRatio - actualAspectRatio) < epsilon)
}
