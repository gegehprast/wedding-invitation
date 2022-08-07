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

    const handleSubmitGuestBook: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()
    }
    
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
                <h1 className='text-2xl text-center md:text-4xl laptop:text-3xl 2xl:text-4xl font-HinaMincho'>BUKU TAMU</h1>
            </div>

            <div className='w-full px-2 mt-8 md:px-20 laptop:px-10 2xl:px-20 md:mt-14 lg:mt-28 laptop:mt-6 2xl:mt-24 font-Inter'>
                <div className='max-h-[42vh] md:max-h-[45vh] laptop:max-h-[43vh] 2xl:max-h-[45vh] overflow-y-scroll pl-0 pr-2 md:p-4' onWheel={handleMessageWheel} ref={messageDivRef}>
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

            <div className='w-full px-2 mt-2 md:px-20 laptop:px-10 2xl:px-20'>
                <div className='px-2 md:px-4'>
                    <form className='flex flex-col w-11/12 pr-2 ml-auto text-black md:pl-4' onSubmit={handleSubmitGuestBook}>
                        <input type='text' className='w-full p-1 rounded' placeholder='Nama' />

                        <textarea className='w-full p-1 mt-2 rounded' maxLength={200} placeholder='Ucapan' />

                        <select className='w-full p-1 mt-2 rounded' defaultValue={0}>
                            <option value={0} disabled={true}>Konfirmasi Kehadiran</option>
                            <option value={1}>Akan Hadir</option>
                            <option value={2}>Tidak Hadir</option>
                            <option value={3}>Telah Hadir</option>
                        </select>

                        <div className='w-full mt-2'>
                            <button type='submit' className='px-3 py-1 rounded-2xl bg-gold text-blue-floral hover:bg-gold2'>
                                Kirim
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default GuestBook
