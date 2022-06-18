import React from 'react'

interface Props {
    className?: string
}

const BgFlowerHorizontalDown: React.FC<Props> = ({ className }) => {
    return (
        <div className={`absolute w-screen h-screen ${className}`}>
            <div className={`w-full h-full bg-no-repeat bg-contain bg-[url(/svg/flower-horizontal-down.svg)] bg-[position:center`}>

            </div>
        </div>
    )
}

export default BgFlowerHorizontalDown
