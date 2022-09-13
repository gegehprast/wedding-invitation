import React from 'react'
import Image from 'next/image'
import flowerCircle from '../../public/svg/flower-circle-final.svg'

interface MainProps {
    open: () => void
}

const Main: React.FC<MainProps> = ({ open }) => {
    return (
        <>
            <div className='w-full'>
                <h1 className='text-3xl text-center md:text-4xl font-HinaMincho'>THE WEDDING OF</h1>
            </div>

            <Image
                className='mb-6 pointer-events-none'
                src={flowerCircle}
                alt="Gegeh & Alma"
            />

            <div className='flex flex-row items-center justify-center w-full mb-4 text-center flex-nowrap font-HinaMincho md:mb-6 lg:mb-10'>
                <h3 className='mt-2 text-2xl md:text-3xl md:pt-3'>OCT</h3>
                <h2 className='mx-3 text-5xl md:text-8xl'>31</h2>
                <h3 className='mt-2 text-2xl md:text-3xl md:pt-3'>2022</h3>
            </div>

            <div>
                <div className='flex flex-col font-HinaMincho'>
                    <p>
                        Kepada:
                    </p>

                    {/* 20 chars */}
                    <div className='flex items-center justify-center px-2 md:pt-4 md:pb-5 md:px-5 w-[65vw] md:w-[50vw] lg:w-[30vw] laptop:w-[20vw] 2xl:w-[15vw] min-h-[10vh] border-2 rounded-md border-gold'>
                        <span className='leading-none text-center md:text-xl'>ALMALIA DEVEYANTI</span>
                    </div>
                </div>

                <div className='mt-3 md:mt-6'>
                    <button type='button'
                        className='flex flex-row items-center justify-center p-1 px-2 mx-auto md:p-2 md:px-4 laptop:p-1 laptop:px-2 2xl:px-4 flex-nowrap bg-gold rounded-2xl text-blue-floral'
                        onClick={open}
                    >
                        <span className='ml-1 text-sm md:text-base laptop:text-sm 2xl:text-base font-Inter'>Buka Undangan</span>
                    </button>
                </div>
            </div>
        </>
    )
}

export default Main
