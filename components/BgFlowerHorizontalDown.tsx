import React from 'react'

interface Props {
    className?: string
}

const BgFlowerHorizontalDown: React.FC<Props> = ({ className }) => {
    return (
        <div className={`absolute w-full h-full ${className}`}>
            <div className={`w-full h-full bg-no-repeat bg-contain bg-[url(/svg/flower-horizontal-up.png)] bg-[position:center_bottom] rotate-180`}>

            </div>
        </div>
    )
}

export default BgFlowerHorizontalDown
