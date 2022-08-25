import React, { useState } from 'react'
import Mask from '../../public/svg/Mask.svg'
import Sanitize from '../../public/svg/Sanitize.svg'
import Wash from '../../public/svg/Wash.svg'
import Distancing from '../../public/svg/Distancing.svg'
import Image from 'next/image'

interface ProkesProps {
    isActive: boolean
}

const Prokes: React.FC<ProkesProps> = ({ isActive }) => {
    const [transitionDone, setTransitionDone] = useState(false)

    const handleTransitionEnd: React.TransitionEventHandler<
        HTMLDivElement
    > = event => {
        setTransitionDone(true)
    }

    const CLASESS = [
        transitionDone
            ? ''
            : (isActive
                  ? 'scale-100 translate-x-0'
                  : 'scale-0 translate-x-full pointer-events-none') +
              'transition-transform duration-[700ms] delay-[400ms] ease-in-out',
        transitionDone
            ? ''
            : (isActive
                  ? 'scale-100 translate-x-0'
                  : 'scale-0 translate-x-full pointer-events-none') +
              'transition-transform duration-[700ms] delay-[700ms] ease-in-out',
        transitionDone
            ? ''
            : (isActive
                  ? 'scale-100 translate-x-0'
                  : 'scale-0 translate-x-full pointer-events-none') +
              'transition-transform duration-[700ms] delay-[900ms] ease-in-out',

        transitionDone
            ? ''
            : (isActive
                  ? 'scale-100 translate-x-0'
                  : 'scale-0 translate-x-full pointer-events-none') +
              'transition-transform duration-[700ms] delay-[1100ms] ease-in-out',

        transitionDone
            ? ''
            : (isActive
                  ? 'scale-100 translate-x-0'
                  : 'scale-0 translate-x-full pointer-events-none') +
              'transition-transform duration-[700ms] delay-[1300ms] ease-in-out',
    ]

    return (
        <>
            <div className={`${CLASESS[0]} w-full`}>
                <h1 className="text-2xl text-center md:text-4xl laptop:text-3xl 2xl:text-4xl font-HinaMincho">
                    PROTOKOL KESEHATAN
                </h1>
            </div>

            <div className="grid w-full h-full grid-flow-row grid-cols-1 gap-0 px-4 mt-10 md:gap-20 md:grid-cols-2 md:px-20 laptop:px-16 2xl:px-20 md:mt-14 lg:mt-28 laptop:mt-6 2xl:mt-24">
                <div
                    className={`${CLASESS[1]} flex flex-row flex-wrap items-center justify-start p-0 md:flex-col md:justify-center`}
                >
                    <div className="flex items-center justify-center w-20 md:w-40">
                        <Image
                            src={Wash}
                            alt="Mencuci Tangan"
                        />
                    </div>

                    <span className="ml-4 text-lg font-Inter md:ml-0 md:mt-2">
                        Mencuci Tangan
                    </span>
                </div>

                <div
                    className={`${CLASESS[2]} flex flex-row flex-wrap items-center justify-start p-0 md:flex-col md:justify-center`}
                >
                    <div className="flex items-center justify-center w-20 md:w-40">
                        <Image
                            src={Mask}
                            alt="Memakai Masker"
                        />
                    </div>

                    <span className="ml-4 text-lg font-Inter md:ml-0 md:mt-2">
                        Memakai Masker
                    </span>
                </div>

                <div
                    className={`${CLASESS[3]} flex flex-row flex-wrap items-center justify-start p-0 md:flex-col md:justify-center`}
                >
                    <div className="flex items-center justify-center w-20 md:w-40">
                        <Image
                            src={Sanitize}
                            alt="Gunakan Hand Sanitizer"
                        />
                    </div>

                    <span className="ml-4 text-lg font-Inter md:ml-0 md:mt-2">
                        Gunakan Hand Sanitizer
                    </span>
                </div>

                <div
                    className={`${CLASESS[4]} flex flex-row flex-wrap items-center justify-start p-0 md:flex-col md:justify-center`}
                    onTransitionEnd={handleTransitionEnd}
                >
                    <div className="flex items-center justify-center w-20 md:w-40">
                        <Image
                            src={Distancing}
                            alt="Menjaga Jarak"
                        />
                    </div>

                    <span className="ml-4 text-lg font-Inter md:ml-0 md:mt-2">
                        Menjaga Jarak
                    </span>
                </div>
            </div>
        </>
    )
}

export default Prokes
