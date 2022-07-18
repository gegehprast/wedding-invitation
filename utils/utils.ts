export const isNil = (value: any) => value === undefined || value === null

export const isNull = (value: any) => value === null

export const isPositiveNumber = (value: number) => value > 0

export function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window

    return {
        width,
        height
    }
}