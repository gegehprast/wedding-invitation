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
                    Jl. Pulau Mas III, Kepuharjo, Kec. Karang Ploso, Kab.
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
                    src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCMbdBjsKGNemBx88h8AHWfJV35pTAJvQM&q=3JW9+QWR, Jl. Pulau Mas III, Kepuh Selatan, Kepuharjo, Kec. Karang Ploso, Kabupaten Malang, Jawa Timur 65152&zoom=15&language=id"
                ></iframe>
            </div>
        </>
    )
}

export default Map
