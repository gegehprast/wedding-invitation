import React from 'react'
import Image from 'next/image'
import flowerCircle from '../../public/svg/flower-circle-final.svg'

const Main = () => {
    return (
        <div className="relative flex flex-row items-center justify-center w-full h-full bg-red-400 bg-opacity-0 md:p-20 lg:p-24">
            <Image
                src={flowerCircle}
                alt="Gegeh & Alma"
            />
        </div>
    )
}

export default Main
