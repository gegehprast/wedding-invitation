import React, { useState } from 'react'
import Image from 'next/image'
import flowerCircle from '../../public/svg/flower-circle-final.svg'

interface ThankProps {
    isActive: boolean
}

const Thanks: React.FC<ThankProps> = ({ isActive }) => {
    const [transitionDone, setTransitionDone] = useState(false)

    const handleTransitionEnd: React.TransitionEventHandler<
        HTMLDivElement
    > = event => {
        setTransitionDone(true)
    }

    const CLASESS = [
        transitionDone
            ? ''
            : (isActive ? 'translate-y-0 opacity-100' : 'opacity-0 translate-y-full pointer-events-none') +
              'transition-all duration-1000 delay-[600ms] ease-in-out',
        transitionDone
            ? ''
            : (isActive ? 'translate-y-0 opacity-100' : 'opacity-0 translate-y-full pointer-events-none') +
              'transition-all duration-1000 delay-[600ms] ease-in-out',
        transitionDone
            ? ''
            : (isActive ? 'translate-y-0 opacity-100' : 'opacity-0 translate-y-full pointer-events-none') +
              'transition-all duration-1000 delay-[1200ms] ease-in-out',
        transitionDone
            ? ''
            : (isActive ? 'scale-100 opacity-100' : 'opacity-0 scale-0 pointer-events-none') +
              'transition-all duration-1000 delay-[1200ms] ease-in-out',
    ]

    return (
        <>
            <div className={`${CLASESS[0]} w-full`}>
                <h1 className="text-2xl text-center md:text-4xl laptop:text-3xl 2xl:text-4xl font-HinaMincho"></h1>
            </div>

            <div className="w-full mt-10 text-center md:mt-14 lg:mt-28 laptop:mt-10 2xl:mt-24">
                <div className="px-4 md:px-20 laptop:px-16 2xl:px-20">
                    <h2
                        className={`${CLASESS[1]} text-xl text-center font-Peddana md:text-3xl laptop:text-2xl 2xl:text-3xl`}
                    >
                        Merupakan suatu kehormatan dan kebahagiaan bagi kami
                        apabila Bapak/Ibu/Saudara/i berkenan hadir untuk
                        memberikan doa restu kepada kedua mempelai.
                    </h2>

                    <h2
                        className={`${CLASESS[2]} mt-10 text-xl text-center font-Peddana md:text-3xl laptop:text-2xl 2xl:text-3xl`}
                    >
                        Wassalamu&apos;alaikum Warahmatullahi Wabarakatuh.
                    </h2>
                </div>
            </div>

            <div className='px-6 mt-10 md:px-40 lg:px-40 laptop:px-40 xl:px-48'>
                <Image
                    className={`${CLASESS[3]} pointer-events-none`}
                    onTransitionEnd={handleTransitionEnd}
                    src={flowerCircle}
                    alt="Gegeh & Alma"
                />
            </div>
        </>
    )
}

export default Thanks
