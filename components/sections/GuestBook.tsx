import React, { useCallback, useEffect, useRef } from 'react'

const GuestBook = () => {
    const messageDivRef = useRef<HTMLDivElement>(null)

    const handleMessageWheel: React.WheelEventHandler<HTMLDivElement> = (e) => {
        e.stopPropagation()
    }

    const handleMessageTouch = useCallback(
        (e: TouchEvent) => {
            e.stopPropagation()
        },
        [],
    )
    
    useEffect(() => {
        const instance = messageDivRef.current

        instance!.addEventListener('touchstart', handleMessageTouch)
        instance!.addEventListener('touchmove', handleMessageTouch)

        return () => {
            instance!.removeEventListener('touchstart', handleMessageTouch)
            instance!.removeEventListener('touchmove', handleMessageTouch)
        }
    }, [handleMessageTouch])

    return (
        <>
            <div className='w-full'>
                <h1 className='text-2xl text-center md:text-4xl font-HinaMincho'>BUKU TAMU</h1>
            </div>

            <div className='w-full px-2 mt-8 md:px-20 md:mt-20'>
                <div className='font-Inter max-h-[45vh] md:max-h-[35vh] overflow-y-scroll pl-0 pr-2 md:p-4' onWheel={handleMessageWheel} ref={messageDivRef}>
                    {[1, 2, 3, 4, 5].map((v, i) => (<div key={i} className='flex flex-row mb-3 md:mb-6 flex-nowrap'>
                        <div className='w-1/12'>
                            <div className='relative rounded-full shadow-[0_3px_15px_-7px] md:shadow-[0_3px_25px_-10px] bg-gold aspect-square shadow-[color:rgba(206,240,251,1)]'>
                                <span className='absolute text-sm font-semibold text-gray-800 transform -translate-x-1/2 -translate-y-1/2 md:text-xl font-Inter top-1/2 left-1/2'>
                                    AD
                                </span>
                            </div>
                        </div>

                        <div className='w-11/12 pl-2 md:pl-4'>
                            <div className='py-1 px-2 md:px-3 md:py-2 rounded-md shadow-[0_3px_15px_-7px] md:shadow-[0_3px_25px_-10px] bg-gold shadow-[color:rgba(206,240,251,1)]'>
                                <p className='text-sm font-bold text-gray-800 md:text-base'>
                                    Almalia Deve
                                </p>

                                <p className='mt-1 text-sm leading-snug text-gray-800 md:text-base'>
                                    Ikut bahagia teteh cantikku, seketika teringat semua perjalanan Cinta teteh dan akhirnya menemukan Cinta yang semoga jadi pelindung buat teteh. Semoga keluarga kalian selalu dalam kebahagiaan ♥🤗
                                </p>
                            </div>
                        </div>
                    </div>))}
                </div>
            </div>
        </>
    )
}

export default GuestBook
