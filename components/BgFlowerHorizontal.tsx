import React from 'react'

interface Props {
    className?: string
}

const BgFlowerHorizontal: React.FC<Props> = ({ className }) => {
    return (
        <div className={`absolute w-screen h-screen ${className}`}>
            <div className={`w-full h-full bg-no-repeat bg-contain bg-[url(/svg/flower-horizontal.svg)] bg-[position:center_calc(100%+1%)]`}>

            </div>
        </div>
    )
}

export default BgFlowerHorizontal
