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
        <div className="relative flex flex-col items-center justify-start w-full h-full py-6 md:py-20 text-gold">
            <div className='w-full'>
                <h1 className='text-2xl text-center md:text-4xl font-HinaMincho'>JADWAL</h1>
            </div>
            
            <div className='w-full mt-10 text-center md:mt-14 lg:mt-28'>
                <div>
                    <h2 className='text-5xl text-center md:text-7xl font-Creattion'>Akad Nikah</h2>
                    <ul className='mt-2 text-lg leading-none md:text-2xl md:mt-4 font-BebasNeue'>
                        <li>Senin, 31 Oktober 2022</li>
                        <li>Pukul 08:00 WIB - selesai</li>
                    </ul>
                </div>

                <div className='mt-10 md:mt-14 lg:mt-28'>
                    <h2 className='text-5xl text-center md:text-7xl font-Creattion'>Resepsi</h2>
                    <ul className='mt-2 text-lg leading-none md:text-2xl md:mt-4 font-BebasNeue'>
                        <li>Senin, 31 Oktober 2022</li>
                        <li>Pukul 12:00 WIB - selesai</li>
                    </ul>
                </div>
            </div>
            
            <div className='flex flex-row items-center justify-center w-full text-center mt-14 flex-nowrap font-BebasNeue text-gold'>
                <div className='flex flex-col mx-3 md:mx-6'>
                    <span className='text-4xl md:text-6xl'>{days}</span>
                    <span className='text-xl md:text-3xl'>HARI</span>
                </div>

                <div className='flex flex-col mx-3 md:mx-6'>
                    <span className='text-4xl md:text-6xl'>{hours}</span>
                    <span className='text-xl md:text-3xl'>JAM</span>
                </div>

                <div className='flex flex-col mx-3 md:mx-6'>
                    <span className='text-4xl md:text-6xl'>{minutes}</span>
                    <span className='text-xl md:text-3xl'>MENIT</span>
                </div>

                <div className='flex flex-col mx-3 md:mx-6'>
                    <span className='text-4xl md:text-6xl'>{seconds}</span>
                    <span className='text-xl md:text-3xl'>DETIK</span>
                </div>
            </div>

            <div className='flex mt-6 md:mt-10'>
                <a href='https://calendar.google.com/event?action=TEMPLATE&tmeid=MnV2azlnbWg1bDI5NjNxOTI2bjA4aTFoczIgMWhxc2ppa251aDA1Mm1xbXExcjV2dTYzYmNAZw&tmsrc=1hqsjiknuh052mqmq1r5vu63bc%40group.calendar.google.com'
                    className='flex flex-row items-center justify-center p-2 px-3 mx-auto md:p-2 md:px-4 flex-nowrap bg-gold rounded-2xl text-blue-floral'
                    target={'_blank'}
                    rel='noreferrer'
                >
                    <span className='w-4 h-4 md:w-5 md:h-5'><Calendar /></span>
                    <span className='ml-1 text-sm md:text-base font-Inter'>Simpan ke kalender</span>
                </a>
            </div>
        </div>
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