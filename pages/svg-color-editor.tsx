import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import getSvgColors from '../utils/get-svg-colors'
import { ColorChangeHandler, RGBColor } from 'react-color'
import SketchPicker from '../components/SketchPicker'
import { useDebouncedCallback } from 'use-debounce'
import chroma from 'chroma-js'
import Renderer from '../components/ColorEditor/Renderer'
import FileSelector from '../components/ColorEditor/FileSelector'

interface SVGColor {
    original: string;
    modified: string;
}

const COLOR = { r: 155, g: 155, b: 155, a: 1 }

const SvgColorEditor = () => {
    const [originalSvg, setOriginalSvg] = useState<string | null>(null)
    const [svg, setSvg] = useState<string | null>(null)
    const [color, setColor] = useState<RGBColor>(COLOR)
    const [brightness, setBrightness] = useState(0)
    const [darkness, setDarkness] = useState(0)
    const [saturation, setSaturation] = useState(0)
    const [desaturation, setDesaturation] = useState(0)
    const [svgColors, setSvgColors] = useState<SVGColor[]>([])

    const rendererContainer = useRef<HTMLDivElement>(null)
    const base64SVG = useMemo(() => svg ? window.btoa(svg) : null, [svg])

    const debounceSetBackgroundColor = useDebouncedCallback((c: RGBColor) => {
        rendererContainer.current!.style.backgroundColor = `rgb(${c.r}, ${c.g}, ${c.b}, ${c.a})`
    }, 500, { trailing: true })

    const handleSvgChange = useCallback(
        (svg: string) => {
            setOriginalSvg(svg)
            setSvg(svg)
            setBrightness(0)
            setDarkness(0)
            setSaturation(0)
            setDesaturation(0)
        },
        [],
    )
    
    const handleBgChange: ColorChangeHandler = useCallback(
        (color) => {
            setColor(color.rgb)

            debounceSetBackgroundColor(color.rgb)
        },
        [debounceSetBackgroundColor],
    )

    const handleColorChange = (index: number, color: string) => {
        const clone = [...svgColors]

        clone[index] = {
            original: clone[index].original,
            modified: color
        }

        setSvgColors(clone)
    }

    const handleModifierChange = useCallback(
        (key: string, event: React.ChangeEvent<HTMLInputElement>) => {
            const value = parseFloat(event.target.value)
            const clone = [...svgColors]

            switch (key) {
                case 'brightness':
                    setBrightness(value)

                    for (let i = 0; i < clone.length; i++) {
                        const color = clone[i];
                        const chromaColor = chroma(color.original).alpha(1).brighten(value)

                        clone[i] = {
                            original: clone[i].original,
                            modified: chromaColor.hex('rgb')
                        }
                    }
                    break;

                case 'darkness':
                    setDarkness(value)

                    for (let i = 0; i < clone.length; i++) {
                        const color = clone[i];
                        const chromaColor = chroma(color.original).alpha(1).darken(value)

                        clone[i] = {
                            original: clone[i].original,
                            modified: chromaColor.hex('rgb')
                        }
                    }
                    break;

                case 'saturation':
                    setSaturation(value)

                    for (let i = 0; i < clone.length; i++) {
                        const color = clone[i];
                        const chromaColor = chroma(color.original).alpha(1).saturate(value)

                        clone[i] = {
                            original: clone[i].original,
                            modified: chromaColor.hex('rgb')
                        }
                    }
                    break;

                case 'desaturation':
                    setDesaturation(value)

                    for (let i = 0; i < clone.length; i++) {
                        const color = clone[i];
                        const chromaColor = chroma(color.original).alpha(1).desaturate(value)

                        clone[i] = {
                            original: clone[i].original,
                            modified: chromaColor.hex('rgb')
                        }
                    }
                    break;

                default:
                    break;
            }

            setSvgColors(clone)
        },
      [svgColors],
    )

    const handleApplyModifier = useCallback(
        () => {
            const mapObj: Record<string, string> = svgColors.reduce((current, color) => Object.assign(current, { [color.original]: color.modified }), {})
            const regex = new RegExp(Object.keys(mapObj).join('|'), 'gi')
            const replaced = originalSvg!.replace(regex, function (matched) {
                return mapObj[matched];
            })

            setSvg(replaced)
        },
        [originalSvg, svgColors],
    )
    
    useEffect(() => {
        console.log(svg)
        if (svg) {
            const colors = getSvgColors(svg).map(color => ({
                original: color,
                modified: color,
            }))

            setSvgColors(prev => {
                console.log({prev, colors})
                return colors
            })
        }
    }, [svg])
    
    
    return (
        <main className='flex flex-row flex-nowrap'>
            <div className='w-1/2 h-screen border-8 border-r-4' ref={rendererContainer}
                style={{ backgroundColor: `rgb(${COLOR.r}, ${COLOR.g}, ${COLOR.b}, ${COLOR.a})` }}
            >
                <Renderer svg={base64SVG} className='w-full' />
            </div>

            <div className='w-2/12 h-screen border-8 border-l-4 border-r-4'>
                <div className='w-full p-2 border-b-8'>
                    <div className='mb-2 text-lg font-semibold leading-none'>SVG File</div>

                    <FileSelector onChange={handleSvgChange} />
                </div>

                <div className='w-full p-2 border-b-8'>
                    <div className='mb-2 text-lg font-semibold leading-none'>Background Color</div>

                    <SketchPicker color={color} onChange={handleBgChange} />
                </div>

                <div className='w-full p-2 border-b-8'>
                    <div className='mb-2 text-lg font-semibold leading-none'>Modifier</div>

                    <div className='grid w-full grid-flow-row grid-cols-1'>
                        <div className='flex flex-wrap p-2'>
                            <span className='w-full text-gray-600'>Brightness ({brightness})</span>

                            <input type={'range'}
                                className='w-full'
                                min={0}
                                max={10}
                                step={0.1}
                                value={brightness}
                                onChange={e => handleModifierChange('brightness', e)} />
                        </div>
                        <div className='flex flex-wrap p-2'>
                            <span className='w-full text-gray-600'>Darken ({darkness})</span>

                            <input type={'range'}
                                className='w-full'
                                min={0}
                                max={10}
                                step={0.1}
                                value={darkness}
                                onChange={e => handleModifierChange('darkness', e)} />
                        </div>
                        <div className='flex flex-wrap p-2'>
                            <span className='w-full text-gray-600'>Saturation ({saturation})</span>

                            <input type={'range'}
                                className='w-full'
                                min={0}
                                max={10}
                                step={0.1}
                                value={saturation}
                                onChange={e => handleModifierChange('saturation', e)} />
                        </div>
                        <div className='flex flex-wrap p-2'>
                            <span className='w-full text-gray-600'>Desaturation ({desaturation})</span>

                            <input type={'range'}
                                className='w-full'
                                min={0}
                                max={10}
                                step={0.1}
                                value={desaturation}
                                onChange={e => handleModifierChange('desaturation', e)} />
                        </div>
                    </div>

                    <div className='flex w-full mt-4'>
                        <button className='px-4 py-2 mx-auto text-white bg-blue-500 rounded hover:bg-blue-400'
                            onClick={handleApplyModifier}
                        >Apply</button>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default SvgColorEditor
