import React from 'react'
import Image from 'next/image'
import flowerCircle from '../../public/svg/flower-circle-final.svg'

const Main = () => {
    return (
        <div className="relative flex flex-col items-center justify-center w-full h-full bg-red-400 bg-opacity-0 md:p-20 lg:p-24">
            <div className='w-full text-center'>
                <h1 className='text-3xl md:text-5xl font-lmroman text-[color:#E6C390]'>THE WEDDING OF</h1>
            </div>

            <Image
                src={flowerCircle}
                alt="Gegeh & Alma"
            />

            <div className='flex flex-row items-center justify-center w-full mt-6 text-center flex-nowrap'>
                <h3 className='text-xl md:text-3xl font-lmroman text-[color:#E6C390]'>OCT</h3>
                <h2 className='text-5xl md:text-8xl font-lmroman text-[color:#E6C390] mx-3'>31</h2>
                <h3 className='text-xl md:text-3xl font-lmroman text-[color:#E6C390]'>2022</h3>
            </div>
        </div>
    )
}

export default Main
