import Image from 'next/image'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import getSvgColors from '../utils/get-svg-colors'
import { ColorChangeHandler, RGBColor } from 'react-color'
import SketchPicker from '../components/SketchPicker'
import { useDebouncedCallback } from 'use-debounce'
import chroma from 'chroma-js'

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

    const handleApplyModifier = useCallback(
        () => {
            const mapObj: Record<string, string> = svgColors.reduce((current, color) => Object.assign(current, { [color.original]: color.modified }), {})
            const regex = new RegExp(Object.keys(mapObj).join('|'), 'gi')
            const replaced = originalSvg!.replace(regex, function (matched) {
                return mapObj[matched];
            })

            console.log(mapObj, originalSvg, replaced)

            setSvg(replaced)
        },
        [originalSvg, svgColors],
    )
    
    useEffect(() => {
        if (svg) {
            const colors = getSvgColors(svg).map(color => ({
                original: color,
                modified: color,
            }))

            setSvgColors(colors)
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
                                onChange={(e) => setBrightness(parseFloat(e.target.value))} />
                        </div>
                        <div className='flex flex-wrap p-2'>
                            <span className='w-full text-gray-600'>Darken ({darkness})</span>

                            <input type={'range'}
                                className='w-full'
                                min={0}
                                max={10}
                                step={0.1}
                                value={darkness}
                                onChange={(e) => setDarkness(parseFloat(e.target.value))} />
                        </div>
                        <div className='flex flex-wrap p-2'>
                            <span className='w-full text-gray-600'>Saturation ({saturation})</span>

                            <input type={'range'}
                                className='w-full'
                                min={0}
                                max={10}
                                step={0.1}
                                value={saturation}
                                onChange={(e) => setSaturation(parseFloat(e.target.value))} />
                        </div>
                        <div className='flex flex-wrap p-2'>
                            <span className='w-full text-gray-600'>Desaturation ({desaturation})</span>

                            <input type={'range'}
                                className='w-full'
                                min={0}
                                max={10}
                                step={0.1}
                                value={desaturation}
                                onChange={(e) => setDesaturation(parseFloat(e.target.value))} />
                        </div>
                    </div>

                    <div className='flex w-full mt-4'>
                        <button className='px-4 py-2 mx-auto text-white bg-blue-500 rounded hover:bg-blue-400'
                            onClick={handleApplyModifier}
                        >Apply</button>
                    </div>
                </div>
            </div>
            
            <div className='w-4/12 h-screen overflow-y-scroll border-8 border-l-4'>
                <div className='w-full p-2 border-b-8'>
                    <div className='mb-2 text-lg font-semibold leading-none'>Colors</div>
                    
                    <div className='grid w-full grid-flow-row grid-cols-6 mt-10'>
                        {svgColors.map((color, index) => <Color
                            key={index}
                            index={index}
                            color={color.original}
                            onChange={handleColorChange}
                            brightness={brightness}
                            darkness={darkness}
                            saturation={saturation}
                            desaturation={desaturation} />)}
                    </div>
                </div>
            </div>
        </main>
    )
}

interface ColorProps {
    index: number
    color: string
    brightness: number
    darkness: number
    saturation: number
    desaturation: number
    onChange: (index: number, newColor: string) => void
}

const Color: React.FC<ColorProps> = ({ index, color, brightness, darkness, saturation, desaturation, onChange }) => {
    const [originalchromaColor, setOriginalchromaColor] = useState(chroma(color))
    const [chromaColor, setChromaColor] = useState(originalchromaColor)
    const rgba = useMemo(() => {
        return {
            r: originalchromaColor.get('rgba.r'),
            g: originalchromaColor.get('rgba.g'), 
            b: originalchromaColor.get('rgba.b'), 
            a: originalchromaColor.get('rgba.a')
        }
    }, [originalchromaColor])
    const rgba2 = useMemo(() => {
        return {
            r: chromaColor.get('rgba.r'),
            g: chromaColor.get('rgba.g'),
            b: chromaColor.get('rgba.b'),
            a: chromaColor.get('rgba.a')
        }
    }, [chromaColor])

    const handleChange: ColorChangeHandler = (color) => {
        const newChromaColor = chroma(color.hex).alpha(color.rgb.a || 1)
        const modified = newChromaColor.brighten(brightness)
            .darken(darkness)
            .saturate(saturation)
            .desaturate(desaturation)

        setOriginalchromaColor(newChromaColor)
        
        setChromaColor(modified)

        onChange(index, modified.hex())
    }
    
    return (
        <div className='flex flex-wrap p-2'>
            <SketchPicker color={rgba} onChange={handleChange} />

            <div className='pointer-events-none'>
                <SketchPicker color={rgba2} />
            </div>

            <span className='ml-2 text-gray-600'>
                {chromaColor.hex('rgba').toUpperCase()}
            </span>
        </div>
    )
}

const Renderer: React.FC<{ svg: string | null, className: string }> = ({ svg, className }) => {
    if (!svg) {
        return null
    }
    
    return (
        <Image src={`data:image/svg+xml;base64,${svg}`}
            className={className}
            width={500}
            height={500}
            alt="SVG"
            layout='responsive' />
    )
}

const FileSelector: React.FC<{ onChange: (result: string) => void }> = ({ onChange }) => {
    const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0]
            const reader = new FileReader()

            reader.readAsArrayBuffer(file)

            reader.onload = e => {
                if (e.target?.result) {
                    const decoder = new TextDecoder('utf-8')
                    const dataView = new DataView(e.target.result as ArrayBuffer)
                    const decodedString = decoder.decode(dataView)
                    
                    onChange(decodedString)
                }
            };
        }
    }
    
    return (
        <input type="file" id="svg-file" accept='image/svg+xml' onChange={handleFileChange} />
    )
}


export default SvgColorEditor
