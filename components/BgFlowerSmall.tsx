import React from 'react'

interface Props {
    className?: string
}

const BgFlowerSmall: React.FC<Props> = ({ className }) => {
    return (
        <div className={`absolute w-screen h-screen bg-no-repeat bg-contain bg-[url(/svg/flower-small.svg)] bg-[position:-50px_-50px] ${className}`}>

        </div>
    )
}

export default BgFlowerSmall
