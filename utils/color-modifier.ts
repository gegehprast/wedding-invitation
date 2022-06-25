import chroma from "chroma-js";

export interface SVGColor {
    original: string;
    modified: string;
}

const applyModifier = (
    colors: string[],
    value: number,
    chromFn: (color: string, value: number) => chroma.Color
) => {
    const clone = [...colors]

    for (let i = 0; i < clone.length; i++) {
        const color = clone[i];
        const chromaColor = chromFn(color, value)

        clone[i] = chromaColor.hex('rgb')
    }

    return clone
}

export const modifyColors = (colors: string[], modifier: string, value: number) => {
    let modifiedColors = colors

    switch (modifier) {
        case 'brightness':
            modifiedColors = applyModifier(
                colors,
                value,
                (color, value) => chroma(color).alpha(1).brighten(value)
            )
            break;

        case 'darkness':
            modifiedColors = applyModifier(
                colors,
                value,
                (color, value) => chroma(color).alpha(1).darken(value)
            )
            break;

        case 'saturation':
            modifiedColors = applyModifier(
                colors,
                value,
                (color, value) => chroma(color).alpha(1).saturate(value)
            )
            break;

        case 'desaturation':
            modifiedColors = applyModifier(
                colors,
                value,
                (color, value) => chroma(color).alpha(1).desaturate(value)
            )
            break;
    }

    return modifiedColors
}
