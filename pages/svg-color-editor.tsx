import Image from 'next/image'
import React, { useCallback, useMemo, useRef, useState } from 'react'
import getSvgColors from '../utils/get-svg-colors'
import { ColorChangeHandler, RGBColor } from 'react-color'
import SketchPicker from '../components/SketchPicker'
import { useDebouncedCallback } from 'use-debounce'

const COLOR = { r: 155, g: 155, b: 155, a: 1 }

const SvgColorEditor = () => {
    const [svg, setSvg] = useState<string | null>(null)
    const [color, setColor] = useState<RGBColor>(COLOR)
    const rendererContainer = useRef<HTMLDivElement>(null)
    const base64SVG = useMemo(() => svg ? window.btoa(svg) : null, [svg])
    const svgColors = useMemo(() => svg ? getSvgColors(svg, true) as string[] : [], [svg])

    const debounceSetBackgroundColor = useDebouncedCallback((c: RGBColor) => {
        rendererContainer.current!.style.backgroundColor = `rgb(${c.r}, ${c.g}, ${c.b}, ${c.a})`
    }, 500, { trailing: true })

    const handleSvgChange = useCallback(
        (svg: string) => {
            setSvg(svg)
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
    
    return (
        <main className='flex flex-row flex-nowrap'>
            <div className='w-1/2 h-screen border-8 border-r-4' ref={rendererContainer}
                style={{ backgroundColor: `rgb(${COLOR.r}, ${COLOR.g}, ${COLOR.b}, ${COLOR.a})` }}
            >
                <Renderer svg={base64SVG} className='w-full' />
            </div>
            
            <div className='w-1/2 min-h-screen border-8 border-l-4'>
                <div className='w-full p-2 border-b-8'>
                    <div className='mb-2 text-lg font-semibold leading-none'>SVG File</div>
                    
                    <FileSelector onChange={handleSvgChange} />
                </div>

                <div className='w-full p-2 border-b-8'>
                    <div className='mb-2 text-lg font-semibold leading-none'>Background Color</div>

                    <SketchPicker color={color} onChange={handleBgChange} />
                </div>

                <div className='w-full p-2 border-b-8'>
                    <div className='mb-2 text-lg font-semibold leading-none'>Colors</div>
                    
                    <Colors colors={svgColors} />
                </div>
            </div>
        </main>
    )
}

const Colors: React.FC<{ colors: string[] }> = ({ colors }) => {
    return (
        <div className='w-full'>
            {colors.map(color => (
                <div key={color} className='w-full'>
                    {color}
                </div>
            ))}
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
