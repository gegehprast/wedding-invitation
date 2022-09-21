import React, { useState } from 'react'

interface MapProps {
    isActive: boolean
}

const Map: React.FC<MapProps> = ({ isActive }) => {
    const [transitionDone, setTransitionDone] = useState(false)

    const handleTransitionEnd: React.TransitionEventHandler<
        HTMLDivElement
    > = event => {
        setTransitionDone(true)
    }

    const CLASESS = [
        transitionDone
            ? ''
            : (isActive ? 'translate-x-0' : 'translate-x-full pointer-events-none') +
              'transition-transform duration-500 delay-[400ms] ease-in-out',
        transitionDone
            ? ''
            : (isActive ? 'translate-x-0' : 'translate-x-full pointer-events-none') +
              'transition-transform duration-500 delay-[900ms] ease-in-out',
        transitionDone
            ? ''
            : (isActive ? 'translate-x-0' : 'translate-x-full pointer-events-none') +
              'transition-transform duration-500 delay-[1100ms] ease-in-out',
    ]

    return (
        <>
            <div className={`${CLASESS[0]} w-full`}>
                <h1 className="text-2xl text-center md:text-4xl laptop:text-3xl 2xl:text-4xl font-HinaMincho">
                    PETA
                </h1>
            </div>

            <div
                className={`${CLASESS[1]} w-full px-4 mt-10 md:px-20 laptop:px-16 2xl:px-20 md:mt-14 lg:mt-28 laptop:mt-6 2xl:mt-24`}
            >
                <span className="text-sm text-left md:text-base font-Inter">
                    Jl. Pulau Mas III RT 02 RW 06, Kepuharjo, Karang Ploso, Kab.
                    Malang, Jawa Timur 65152
                </span>
            </div>

            <div
                className={`${CLASESS[2]} w-full h-full px-4 pb-20 mt-2 md:pb-10 md:px-20 laptop:px-16 2xl:px-20`}
                onTransitionEnd={handleTransitionEnd}
            >
                <iframe
                    className="w-full h-full border-4 md:border-[6px] rounded-md border-gold"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen={false}
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3951.924180239802!2d112.61760131477881!3d-7.9029899943067425!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x7f5f8d97a171d0c!2zN8KwNTQnMTAuOCJTIDExMsKwMzcnMTEuMiJF!5e0!3m2!1sen!2sid!4v1663138083663!5m2!1sen!2sid&zoom=15&language=id"
                ></iframe>
            </div>
        </>
    )
}

export default Map
