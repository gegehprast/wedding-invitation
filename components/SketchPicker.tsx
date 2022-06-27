import React, { useState } from 'react'
import { ColorChangeHandler, RGBColor, SketchPicker as RC_SketchPicker } from 'react-color'

const SketchPicker: React.FC<{ color: RGBColor, onChange?: ColorChangeHandler, onChangeComplete?: ColorChangeHandler }> = ({ color, onChange, onChangeComplete }) => {
    const [displayColorPicker, setDisplayColorPicker] = useState(false)

    const handleClick = () => {
        setDisplayColorPicker(!displayColorPicker)
    };

    const handleClose = () => {
        setDisplayColorPicker(false)
    };

    const handleChange: ColorChangeHandler = (color, event) => {
        if (onChange) {
            onChange(color, event)
        }

        if (onChangeComplete) {
            onChangeComplete(color, event)
        }
    };

    const styles: Record<string, React.CSSProperties> = {
        color: {
            width: '36px',
            height: '14px',
            borderRadius: '2px',
            background: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
        },
        swatch: {
            padding: '5px',
            background: '#fff',
            borderRadius: '1px',
            boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
            display: 'inline-block',
            cursor: 'pointer',
        }
    }
    
    return (
        <div className='relative'>
            <div style={styles.swatch} onClick={handleClick}>
                <div style={styles.color} />
            </div>

            {displayColorPicker ? <div className='absolute z-20'>
                <div className='fixed top-0 bottom-0 left-0 right-0' onClick={handleClose} />
                
                <RC_SketchPicker color={color} onChange={handleChange} onChangeComplete={handleChange} />
            </div> : null}

        </div>
    )
}

export default SketchPicker
