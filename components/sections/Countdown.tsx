import React, { useEffect, useRef } from 'react'
import Calendar from '../Icons/Calendar'
import RCountdown, { CountdownRendererFn } from 'react-countdown'
import LocationMarker from '../Icons/LocationMarker'

const Countdown = () => {
    const counter = useRef<RCountdown>(null)

    useEffect(() => {
        counter.current?.start()
    }, [])

    return (
        <div className="relative flex flex-col items-center w-full h-full py-20 md:py-28 lg:py-24">
            <RCountdown
                date={(new Date('October 31, 2022 00:00:00 GMT+07:00'))}
                renderer={Renderer}
                autoStart={false}
                ref={counter}
            />
        </div>
    )
}

const Renderer: CountdownRendererFn = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
        return (
            <div className='absolute w-full -translate-y-1/2 top-1/2'>
                <div className='flex flex-row items-center justify-center w-full mt-6 text-5xl text-center md:text-8xl flex-nowrap font-Creattion text-gold'>
                    Today&apos;s the day!
                </div>

                <div className='flex w-full'>
                    <a href='https://goo.gl/maps/EaaEGzcQzfhXwh6H9'
                        className='flex flex-row items-center justify-center p-2 px-4 mx-auto mt-10 flex-nowrap bg-gold rounded-2xl text-blue-floral'
                        target={'_blank'}
                        rel='noreferrer'
                    >
                        <span className='w-5 h-5'><LocationMarker /></span>
                        <span className='ml-1 font-Inter'>Lihat lokasi</span>
                    </a>
                </div>
            </div>
        )
    }

    return (
        <div className='absolute w-full -translate-y-1/2 top-1/2'>
            <div className='w-full'>
                <h1 className='text-5xl text-center md:text-7xl font-Creattion text-gold '>31 Oktober 2022</h1>
            </div>

            <div className='flex flex-row items-center justify-center w-full mt-6 text-center flex-nowrap font-BebasNeue text-gold'>
                <div className='flex flex-col mx-4 md:mx-6'>
                    <span className='text-5xl md:text-6xl'>{days}</span>
                    <span className='text-2xl md:text-3xl'>HARI</span>
                </div>

                <div className='flex flex-col mx-4 md:mx-6'>
                    <span className='text-5xl md:text-6xl'>{hours}</span>
                    <span className='text-2xl md:text-3xl'>JAM</span>
                </div>

                <div className='flex flex-col mx-4 md:mx-6'>
                    <span className='text-5xl md:text-6xl'>{minutes}</span>
                    <span className='text-2xl md:text-3xl'>MENIT</span>
                </div>

                <div className='flex flex-col mx-4 md:mx-6'>
                    <span className='text-5xl md:text-6xl'>{seconds}</span>
                    <span className='text-2xl md:text-3xl'>DETIK</span>
                </div>
            </div>

            <div className='flex w-full'>
                <a href='https://calendar.google.com/event?action=TEMPLATE&tmeid=MnV2azlnbWg1bDI5NjNxOTI2bjA4aTFoczIgMWhxc2ppa251aDA1Mm1xbXExcjV2dTYzYmNAZw&tmsrc=1hqsjiknuh052mqmq1r5vu63bc%40group.calendar.google.com'
                    className='flex flex-row items-center justify-center p-2 px-4 mx-auto mt-10 flex-nowrap bg-gold rounded-2xl text-blue-floral'
                    target={'_blank'}
                    rel='noreferrer'
                >
                    <span className='w-5 h-5'><Calendar /></span>
                    <span className='ml-1 font-Inter'>Simpan ke kalender</span>
                </a>
            </div>
        </div>
    )
}

export default Countdown