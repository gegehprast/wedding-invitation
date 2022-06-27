import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import getSvgColors from '../utils/get-svg-colors'
import { ColorChangeHandler, RGBColor } from 'react-color'
import SketchPicker from '../components/SketchPicker'
import { useDebouncedCallback } from 'use-debounce'
import Renderer from '../components/ColorEditor/Renderer'
import FileSelector from '../components/ColorEditor/FileSelector'
import Color from '../components/ColorEditor/Color'
import chroma from 'chroma-js'

const COLOR = { r: 155, g: 155, b: 155, a: 1 }

const SvgColorEditor = () => {
    const [bgColor, setBgColor] = useState<RGBColor>(COLOR)
    const [originalSvg, setOriginalSvg] = useState<string | null>(null)
    const [modifiedSvg, setModifiedSvg] = useState<string | null>(null)
    const [svgColors, setSvgColors] = useState<string[]>([])
    const [modifiedSvgColors, setModifiedSvgColors] = useState<string[]>([])

    // modifier states
    const [brightness, setBrightness] = useState(0)
    const [darkness, setDarkness] = useState(0)
    const [saturation, setSaturation] = useState(0)
    const [desaturation, setDesaturation] = useState(0)
    const [red, setRed] = useState(0)
    const [green, setGreen] = useState(0)
    const [blue, setBlue] = useState(0)
    const [alpha, setAlpha] = useState(1)

    const rendererContainer = useRef<HTMLDivElement>(null)
    const base64SVG = useMemo(() => modifiedSvg ? window.btoa(modifiedSvg) : null, [modifiedSvg])

    const debounceSetBackgroundColor = useDebouncedCallback((c: RGBColor) => {
        rendererContainer.current!.style.backgroundColor = `rgb(${c.r}, ${c.g}, ${c.b}, ${c.a})`
    }, 500, { trailing: true })

    const debouncedModifierChange = useDebouncedCallback((
        svgColors: string[],
        red: number, 
        green: number, 
        blue: number, 
        alpha: number, 
        brightness: number, 
        darkness: number, 
        desaturation: number, 
        saturation: number
    ) => {
        const clone = [...svgColors]

        for (let i = 0; i < clone.length; i++) {
            const color = clone[i];
            const chromaColor = chroma(color)
            const add = {
                r: chromaColor.get('rgb.r') + red, 
                g: chromaColor.get('rgb.g') + green, 
                b: chromaColor.get('rgb.b') + blue,
                a: chromaColor.alpha() + alpha
            }

            clone[i] = chromaColor
                .set('rgb.r', add.r)
                .set('rgb.g', add.g)
                .set('rgb.b', add.b)
                .alpha(add.a)
                .brighten(brightness)
                .darken(darkness)
                .saturate(saturation)
                .desaturate(desaturation)
                .hex('rgba')
        }

        setModifiedSvgColors(clone)
    }, 500, { trailing: true })

    const handleSvgChange = useCallback(
        (svg: string) => {
            setOriginalSvg(svg)
            setRed(0)
            setGreen(0)
            setBlue(0)
            setAlpha(1)
            setBrightness(0)
            setDarkness(0)
            setSaturation(0)
            setDesaturation(0)
        },
        [],
    )
    
    const handleBgChange: ColorChangeHandler = useCallback(
        (color) => {
            setBgColor(color.rgb)

            debounceSetBackgroundColor(color.rgb)
        },
        [debounceSetBackgroundColor],
    )

    const handleModifierChange = useCallback(
        (modifier: string, event: React.ChangeEvent<HTMLInputElement>) => {
            const value = parseFloat(event.target.value)

            switch (modifier) {
                case 'red':
                    setRed(value)
                    break;

                case 'green':
                    setGreen(value)
                    break;

                case 'blue':
                    setBlue(value)
                    break;

                case 'alpha':
                    setAlpha(value)
                    break;

                case 'brightness':
                    setBrightness(value)
                    break;

                case 'darkness':
                    setDarkness(value)
                    break;

                case 'saturation':
                    setSaturation(value)
                    break;

                case 'desaturation':
                    setDesaturation(value)
                    break;
            }

            debouncedModifierChange(
                svgColors,
                red,
                green,
                blue,
                alpha,
                brightness,
                darkness,
                desaturation,
                saturation
            )
        },
        [alpha, blue, brightness, darkness, debouncedModifierChange, desaturation, green, red, saturation, svgColors],
    )

    useEffect(() => {
        if (originalSvg) {
            const mapObj: Record<string, string> = svgColors.reduce((current, color, index) => Object.assign(current, { [svgColors[index]]: modifiedSvgColors[index] }), {})
            const regex = new RegExp(Object.keys(mapObj).join('|'), 'gi')
            const replaced = originalSvg!.replace(regex, function (matched) {
                return mapObj[matched];
            })

            setModifiedSvg(replaced)
        }
    }, [modifiedSvgColors, originalSvg, svgColors])
    
    
    useEffect(() => {
        if (originalSvg) {
            const colors = getSvgColors(originalSvg)

            setModifiedSvg(originalSvg)
            setSvgColors(colors)
            setModifiedSvgColors(colors)
        }
    }, [originalSvg])
    
    
    return (
        <main className='flex flex-row flex-nowrap'>
            <div className='w-1/2 h-screen transition-colors duration-300 ease-in-out border-8 border-r-4' ref={rendererContainer}
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

                    <SketchPicker color={bgColor} onChange={handleBgChange} />
                </div>

                {originalSvg && <div className='w-full p-2 border-b-8'>
                    <div className='mb-2 text-lg font-semibold leading-none'>Modifier</div>

                    <Modifier red={red} 
                        green={green} 
                        blue={blue} 
                        alpha={alpha} 
                        brightness={brightness}
                        darkness={darkness}
                        saturation={saturation}
                        desaturation={desaturation}
                        handleModifierChange={handleModifierChange} />

                    {/* <div className='flex w-full mt-4'>
                        <button className='px-4 py-2 mx-auto text-white bg-blue-500 rounded hover:bg-blue-400'
                            onClick={handleApplyModifier}
                        >Apply</button>
                    </div> */}
                </div>}
            </div>

            <div className='w-4/12 h-screen overflow-y-scroll border-8 border-l-4'>
                <div className='w-full p-2 border-b-8'>
                    <div className='mb-2 text-lg font-semibold leading-none'>Colors</div>

                    <div className='grid w-full grid-flow-row grid-cols-4 mt-10'>
                        {modifiedSvgColors.map((color, index) => <Color
                            key={index}
                            index={index}
                            color={color} />)}
                    </div>
                </div>
            </div>
        </main>
    )
}

interface ModifierProps {
    red: number
    green: number
    blue: number
    alpha: number
    brightness: number
    darkness: number
    saturation: number
    desaturation: number
    handleModifierChange: (key: string, event: React.ChangeEvent<HTMLInputElement>) => void
}

const Modifier: React.FC<ModifierProps> = ({
    red,
    green,
    blue,
    alpha,
    brightness,
    darkness,
    saturation,
    desaturation,
    handleModifierChange
}) => {
    return (
        <div className='grid w-full grid-flow-row grid-cols-1'>
            <div className='flex flex-wrap p-2'>
                <span className='w-full text-gray-600'>Red</span>

                <input type={'range'}
                    className='w-full'
                    min={-255}
                    max={255}
                    step={0.1}
                    value={red}
                    onChange={e => handleModifierChange('red', e)} />
                <input type={'number'}
                    className='w-full p-2 border rounded'
                    min={-255}
                    max={255}
                    step={0.1}
                    value={red}
                    onChange={e => handleModifierChange('red', e)} />
            </div>
            <div className='flex flex-wrap p-2'>
                <span className='w-full text-gray-600'>Green</span>

                <input type={'range'}
                    className='w-full'
                    min={-255}
                    max={255}
                    step={0.1}
                    value={green}
                    onChange={e => handleModifierChange('green', e)} />
                <input type={'number'}
                    className='w-full p-2 border rounded'
                    min={-255}
                    max={255}
                    step={0.1}
                    value={green}
                    onChange={e => handleModifierChange('green', e)} />
            </div>
            <div className='flex flex-wrap p-2'>
                <span className='w-full text-gray-600'>Blue</span>

                <input type={'range'}
                    className='w-full'
                    min={-255}
                    max={255}
                    step={0.1}
                    value={blue}
                    onChange={e => handleModifierChange('blue', e)} />
                <input type={'number'}
                    className='w-full p-2 border rounded'
                    min={-255}
                    max={255}
                    step={0.1}
                    value={blue}
                    onChange={e => handleModifierChange('blue', e)} />
            </div>
            <div className='flex flex-wrap p-2'>
                <span className='w-full text-gray-600'>alpha</span>

                <input type={'range'}
                    className='w-full'
                    min={-1}
                    max={1}
                    step={0.01}
                    value={alpha}
                    onChange={e => handleModifierChange('alpha', e)} />
                <input type={'number'}
                    className='w-full p-2 border rounded'
                    min={-1}
                    max={1}
                    step={0.01}
                    value={alpha}
                    onChange={e => handleModifierChange('alpha', e)} />
            </div>
            <div className='flex flex-wrap p-2'>
                <span className='w-full text-gray-600'>Brightness</span>

                <input type={'range'}
                    className='w-full'
                    min={0}
                    max={10}
                    step={0.1}
                    value={brightness}
                    onChange={e => handleModifierChange('brightness', e)} />
                <input type={'number'}
                    className='w-full p-2 border rounded'
                    min={0}
                    max={10}
                    step={0.1}
                    value={brightness}
                    onChange={e => handleModifierChange('brightness', e)} />
            </div>
            <div className='flex flex-wrap p-2'>
                <span className='w-full text-gray-600'>Darken</span>

                <input type={'range'}
                    className='w-full'
                    min={0}
                    max={10}
                    step={0.1}
                    value={darkness}
                    onChange={e => handleModifierChange('darkness', e)} />
                <input type={'number'}
                    className='w-full p-2 border rounded'
                    min={0}
                    max={10}
                    step={0.1}
                    value={darkness}
                    onChange={e => handleModifierChange('darkness', e)} />
            </div>
            <div className='flex flex-wrap p-2'>
                <span className='w-full text-gray-600'>Saturation</span>

                <input type={'range'}
                    className='w-full'
                    min={0}
                    max={10}
                    step={0.1}
                    value={saturation}
                    onChange={e => handleModifierChange('saturation', e)} />
                <input type={'number'}
                    className='w-full p-2 border rounded'
                    min={0}
                    max={10}
                    step={0.1}
                    value={saturation}
                    onChange={e => handleModifierChange('saturation', e)} />
            </div>
            <div className='flex flex-wrap p-2'>
                <span className='w-full text-gray-600'>Desaturation</span>

                <input type={'range'}
                    className='w-full'
                    min={0}
                    max={10}
                    step={0.1}
                    value={desaturation}
                    onChange={e => handleModifierChange('desaturation', e)} />
                <input type={'number'}
                    className='w-full p-2 border rounded'
                    min={0}
                    max={10}
                    step={0.1}
                    value={desaturation}
                    onChange={e => handleModifierChange('desaturation', e)} />
            </div>
        </div>
    )
}

export default SvgColorEditor
