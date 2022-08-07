import React, { useEffect, useRef } from 'react'
import Calendar from '../Icons/Calendar'
import RCountdown, { CountdownRendererFn } from 'react-countdown'
import LocationMarker from '../Icons/LocationMarker'

interface CountingProps {
    days: number
    hours: number
    minutes: number
    seconds: number
}

const Countdown = () => {
    const counter = useRef<RCountdown>(null)

    useEffect(() => {
        counter.current?.start()
    }, [])

    return <RCountdown
        date={(new Date('October 31, 2022 00:00:00 GMT+07:00'))}
        renderer={Renderer}
        autoStart={false}
        ref={counter}
    />
}

const Counting: React.FC<CountingProps> = ({ days, hours, minutes, seconds }) => {
    return (
        <>
            <div className='w-full'>
                <h1 className='text-2xl text-center md:text-4xl laptop:text-3xl 2xl:text-4xl font-HinaMincho'>JADWAL</h1>
            </div>
            
            <div className='w-full mt-10 text-center md:mt-14 lg:mt-28 laptop:mt-14 2xl:mt-24'>
                <div>
                    <h2 className='text-5xl text-center md:text-7xl laptop:text-5xl 2xl:text-7xl font-Creattion'>Akad Nikah</h2>
                    <ul className='mt-2 text-lg leading-none md:text-2xl laptop:text-lg 2xl:text-2xl md:mt-4 font-BebasNeue'>
                        <li>Senin, 31 Oktober 2022</li>
                        <li>Pukul 08:00 WIB - selesai</li>
                    </ul>
                </div>

                <div className='mt-10 md:mt-14 lg:mt-28 laptop:mt-10 2xl:mt-20'>
                    <h2 className='text-5xl text-center md:text-7xl laptop:text-5xl 2xl:text-7xl font-Creattion'>Resepsi</h2>
                    <ul className='mt-2 text-lg leading-none md:text-2xl laptop:text-lg 2xl:text-2xl md:mt-4 font-BebasNeue'>
                        <li>Senin, 31 Oktober 2022</li>
                        <li>Pukul 14:00 WIB - selesai</li>
                        <li>
                            Jl. Pulau Mas III, Kepuharjo, Kec. Karang Ploso
                        </li>
                    </ul>
                </div>
            </div>
            
            <div className='flex flex-row items-center justify-center w-full text-center mt-14 2xl:mt-24 flex-nowrap font-BebasNeue text-gold'>
                <div className='flex flex-col mx-3 md:mx-6'>
                    <span className='text-4xl md:text-6xl laptop:text-4xl 2xl:text-6xl'>{days} H</span>
                </div>

                <div className='flex flex-col mx-3 md:mx-6'>
                    <span className='text-4xl md:text-6xl laptop:text-4xl 2xl:text-6xl'>{hours} J</span>
                </div>

                <div className='flex flex-col mx-3 md:mx-6'>
                    <span className='text-4xl md:text-6xl laptop:text-4xl 2xl:text-6xl'>{minutes} M</span>
                </div>

                <div className='flex flex-col mx-3 md:mx-6'>
                    <span className='text-4xl md:text-6xl laptop:text-4xl 2xl:text-6xl'>{seconds} S</span>
                </div>
            </div>

            <div className='flex mt-6 md:mt-10'>
                <a href='https://calendar.google.com/event?action=TEMPLATE&tmeid=MnV2azlnbWg1bDI5NjNxOTI2bjA4aTFoczIgMWhxc2ppa251aDA1Mm1xbXExcjV2dTYzYmNAZw&tmsrc=1hqsjiknuh052mqmq1r5vu63bc%40group.calendar.google.com'
                    className='flex flex-row items-center justify-center p-2 px-3 mx-auto md:p-2 md:px-4 laptop:p-1 laptop:px-2 2xl:px-4 flex-nowrap bg-gold rounded-2xl text-blue-floral'
                    target={'_blank'}
                    rel='noreferrer'
                >
                    <span className='w-4 h-4 md:w-5 md:h-5'><Calendar /></span>
                    <span className='ml-1 text-sm md:text-base laptop:text-sm 2xl:text-base font-Inter'>Simpan ke kalender</span>
                </a>
            </div>
        </>
    )
}

const Completed = () => {
    return (
        <div className="relative flex flex-col items-center w-full h-full py-20 md:py-28 lg:py-24">
            <div className='absolute w-full -translate-y-1/2 top-1/2'>
                <div className='flex flex-row items-center justify-center w-full mt-6 text-5xl text-center md:text-8xl flex-nowrap font-Creattion text-gold'>
                    Today&apos;s the day!
                </div>

                <div className='flex w-full mt-10'>
                    <a href='https://goo.gl/maps/EaaEGzcQzfhXwh6H9'
                        className='flex flex-row items-center justify-center p-2 px-4 mx-auto flex-nowrap bg-gold rounded-2xl text-blue-floral'
                        target={'_blank'}
                        rel='noreferrer'
                    >
                        <span className='w-5 h-5'><LocationMarker /></span>
                        <span className='ml-1 font-Inter'>Lihat lokasi</span>
                    </a>
                </div>
            </div>
        </div>
    )
}

const Renderer: CountdownRendererFn = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
        return <Completed />
    }

    return <Counting days={days} hours={hours} minutes={minutes} seconds={seconds} />
}

export default Countdown