import React from 'react'

interface Props {
    className?: string
}

const BgFlowerBig: React.FC<Props> = ({ className }) => {
    return (
        <div className={`absolute w-screen h-screen bg-no-repeat bg-contain bg-[url(/svg/flower-big.svg)] bg-[position:0px_0px] ${className}`}>

        </div>
    )
}

export default BgFlowerBig
