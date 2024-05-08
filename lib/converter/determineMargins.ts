export function determineMargin(givenMargin: string | undefined, defaultMargin: number = 0): number {
    if (typeof givenMargin === "undefined" || givenMargin === "") {
        return defaultMargin
    }

    if (isNaN(Number(givenMargin))) {
        throw new Error('Invalid margin value provided!')
    }

    return Number(givenMargin)
}
