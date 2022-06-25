import { load } from "cheerio"
import compact from "lodash/compact"
import uniq from "lodash/uniq"

const hexy = /^#[0-9a-f]{3,6}$/i

function isColorString(str: string | undefined) {
    if (!str) return false
    if (str === 'none') return false
    return (str.length === 4 || str.length === 7) && str.match(hexy)
}

function color(str: string | undefined) {
    return isColorString(str) ? str! : null
}

const getSvgColors = (input: string) => {
    const $ = load(input)

    // Find elements with a `fill` attribute
    let fills: (string | null)[] = $('[fill]').map(function () {
        return color($(this).attr('fill'))
    }).get()

    // Find elements with a `stroke` attribute
    let strokes: (string | null)[] = $('[stroke]').map(function () {
        return color($(this).attr('stroke'))
    }).get()

    // Find elements with a `stop-color` attribute (gradients)
    let stops: (string | null)[] = $('[stop-color]').map(function () {
        return color($(this).attr('stop-color'))
    }).get()

    // Find `fill`, `stroke` and `stops` within inline styles
    $('[style]').each(function () {
        fills.push(color($(this).css('fill')))

        strokes.push(color($(this).css('stroke')))

        stops.push(color($(this).css('stop-color')))
    })
    
    return compact(uniq(fills.concat(strokes).concat(stops)))
}

export default getSvgColors
