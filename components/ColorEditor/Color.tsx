import chroma from 'chroma-js'
import React, { useEffect, useMemo, useState } from 'react'
import { ColorChangeHandler } from 'react-color'
import SketchPicker from '../SketchPicker'

interface ColorProps {
    index: number
    color: string
}

const Color: React.FC<ColorProps> = ({ color }) => {
    const [originalchromaColor, setOriginalchromaColor] = useState(chroma(color))
    const rgba = useMemo(() => {
        return {
            r: originalchromaColor.get('rgba.r'),
            g: originalchromaColor.get('rgba.g'),
            b: originalchromaColor.get('rgba.b'),
            a: originalchromaColor.get('rgba.a')
        }
    }, [originalchromaColor])

    const handleChange: ColorChangeHandler = (color) => {
        const newChromaColor = chroma(color.hex).alpha(color.rgb.a || 1)

        setOriginalchromaColor(newChromaColor)
    }

    useEffect(() => {
        setOriginalchromaColor(chroma(color))
    }, [color])
    
    return (
        <div className='flex flex-wrap justify-center p-3'>
            <SketchPicker color={rgba} onChange={handleChange} />

            <span className='w-full text-sm text-center text-gray-600'>
                {`rgb(${ rgba.r }, ${ rgba.g }, ${ rgba.b }, ${ rgba.a })`}
            </span>
        </div>
    )
}

export default Color