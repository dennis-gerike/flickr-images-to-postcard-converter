export function determineMargin(
    givenMargin: string | undefined,
    defaultMargin: number = 0,
    minValue: number = 0,
    maxValue: number = 100
): number {
    if (typeof givenMargin === "undefined" || givenMargin === "") {
        return defaultMargin
    }

    if (isNaN(Number(givenMargin))) {
        throw new Error('Invalid margin value provided!')
    }

    if (Number(givenMargin) < minValue || Number(givenMargin) > maxValue) {
        throw new Error('Margin size out of range!')
    }

    return Number(givenMargin)
}
