import assert from "assert"

export function assertAspectRatio(expectedAspectRatio: number, actualAspectRatio: number, epsilon: number) {
    assert(
        Math.abs(expectedAspectRatio - actualAspectRatio) < epsilon,
        `Image has an aspect ratio of ${actualAspectRatio}, but ${expectedAspectRatio} expected.`
    )
}