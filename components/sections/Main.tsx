import React from 'react'
import Image from 'next/image'
import flowerCircle from '../../public/svg/flower-circle.svg'

const Main = () => {
    return (
        <div className="relative flex flex-row items-center justify-center w-full h-full bg-red-400 bg-opacity-0">
            <Image
                src={flowerCircle}
                alt="Gegeh & Alma"
            />
        </div>
    )
}

export default Main
