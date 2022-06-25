import React from 'react'
import Image from 'next/image'

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

export default Renderer