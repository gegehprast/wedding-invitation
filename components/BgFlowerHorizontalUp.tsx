import React from 'react'

interface Props {
    className?: string
}

const BgFlowerHorizontalUp: React.FC<Props> = ({ className }) => {
    return (
        <div className={`absolute w-full h-full ${className}`}>
            <div className={`w-full h-full bg-no-repeat bg-contain bg-[url(/svg/flower-horizontal-up.svg)] bg-[position:center_100%]`}>

            </div>
        </div>
    )
}

export default BgFlowerHorizontalUp
