import chroma from 'chroma-js'
import React, { useMemo, useState } from 'react'
import { ColorChangeHandler } from 'react-color'
import SketchPicker from '../SketchPicker'

interface ColorProps {
    index: number
    color: string
    onChange: (index: number, newColor: string) => void
}

const Color: React.FC<ColorProps> = ({ index, color, onChange }) => {
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

        onChange(index, newChromaColor.hex())
    }

    return (
        <div className='flex flex-wrap p-2'>
            <SketchPicker color={rgba} onChange={handleChange} />

            <span className='ml-2 text-gray-600'>
                {originalchromaColor.hex('rgba').toUpperCase()}
            </span>
        </div>
    )
}

export default Color