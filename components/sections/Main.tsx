import React from 'react'
import Image from 'next/image'
import flowerCircle from '../../public/svg/flower-circle-final.svg'

const Main = () => {
    return (
        <div className="relative flex flex-col items-center justify-center w-full h-full md:p-20 lg:p-24 font-HinaMincho">
            <div className='w-full'>
                <h1 className='text-3xl md:text-4xl text-center text-[color:#E6C390] '>THE WEDDING OF</h1>
            </div>

            <Image
                className='pointer-events-none'
                src={flowerCircle}
                alt="Gegeh & Alma"
            />

            <div className='flex flex-row items-center justify-center w-full mt-6 flex-nowrap text-[color:#E6C390] text-center'>
                <h3 className='mt-2 text-2xl md:text-3xl md:pt-3'>OCT</h3>
                <h2 className='mx-3 text-5xl md:text-8xl'>31</h2>
                <h3 className='mt-2 text-2xl md:text-3xl md:pt-3'>2022</h3>
            </div>
        </div>
    )
}

export default Main
