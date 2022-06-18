import React from 'react'

interface Props {
    className?: string
}

const BgFlowerHorizontal: React.FC<Props> = ({ className }) => {
    return (
        <div className={`absolute w-screen h-screen overflow-hidden ${className}`}>
            <div className={`w-full h-full bg-no-repeat bg-contain bg-[url(/svg/flower-horizontal.svg)] bg-[position:center_102%]`}>

            </div>
        </div>
    )
}

export default BgFlowerHorizontal
