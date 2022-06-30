import React from 'react'
import Calendar from '../Icons/Calendar'

const Countdown = () => {
    return (
        <div className="relative flex flex-col items-center w-full h-full py-20 md:py-28 lg:py-24">
            <div className='w-full'>
                <h1 className='text-3xl md:text-4xl text-center text-[color:#E6C390] font-HinaMincho'>SAVE THE DATE</h1>
            </div>
            
            <div className='absolute w-full -translate-y-1/2 top-1/2'>
                <div className='w-full'>
                    <h1 className='text-5xl text-center md:text-7xl font-Creattion text-gold '>31 Oktober 2022</h1>
                </div>

                <div className='flex flex-row items-center justify-center w-full mt-6 text-center flex-nowrap font-BebasNeue text-gold'>
                    <div className='flex flex-col mx-4 md:mx-6'>
                        <span className='text-5xl md:text-6xl'>30</span>
                        <span className='text-2xl md:text-3xl'>HARI</span>
                    </div>

                    <div className='flex flex-col mx-4 md:mx-6'>
                        <span className='text-5xl md:text-6xl'>23</span>
                        <span className='text-2xl md:text-3xl'>JAM</span>
                    </div>

                    <div className='flex flex-col mx-4 md:mx-6'>
                        <span className='text-5xl md:text-6xl'>50</span>
                        <span className='text-2xl md:text-3xl'>MENIT</span>
                    </div>

                    <div className='flex flex-col mx-4 md:mx-6'>
                        <span className='text-5xl md:text-6xl'>32</span>
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
        </div>
    )
}

export default Countdown