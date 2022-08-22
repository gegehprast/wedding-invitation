import { useRouter } from 'next/router'
import React, { useState } from 'react'
import Cover from '../modals/Cover'

const BrideAndGroom = () => {
    const [coverModalOpen, setCoverModalOpen] = useState(true)
    const router = useRouter()

    return (
        <>
            <div
                className={`${
                    !coverModalOpen
                        ? 'opacity-100'
                        : 'opacity-0 pointer-events-none'
                } w-full transition-opacity duration-1000 delay-1000 ease-in-out`}
            >
                <h1 className="text-2xl text-center md:text-4xl laptop:text-3xl 2xl:text-4xl font-HinaMincho">
                    MEMPELAI
                </h1>
            </div>

            <div
                className={`${
                    !coverModalOpen
                        ? 'opacity-100'
                        : 'opacity-0 pointer-events-none'
                } w-full mt-10 text-center md:mt-14 lg:mt-28 laptop:mt-10 2xl:mt-24 transition-opacity duration-1000 delay-1000 ease-in-out`}
            >
                <div className="px-4 md:px-20 laptop:px-16 2xl:px-20">
                    <h2 className="text-xl text-center font-Peddana md:text-3xl laptop:text-2xl 2xl:text-3xl">
                        Assalamu’alaikum Warahmatullahi Wabarakatuh. Dengan
                        memohon rahmat dan ridho Allah SWT, kami bermaksud
                        menyelenggarakan acara pernikahan putra-putri kami:
                    </h2>
                </div>

                <div className="mt-12 md:mt-16 lg:mt-32 laptop:mt-14 2xl:mt-24">
                    <h2 className="text-[2.75rem] leading-none text-center md:text-7xl laptop:text-5xl 2xl:text-7xl font-AlexBrush">
                        Gigih Prastyono
                    </h2>
                    <ul className="mt-2 text-xl leading-none md:text-3xl laptop:text-2xl 2xl:text-3xl md:mt-4 font-Peddana">
                        <li>Putra Pertama Bapak Asis & Ibu Sulastri</li>
                    </ul>
                </div>

                <div className="mt-10 md:mt-14 lg:mt-28 laptop:mt-10 2xl:mt-20">
                    <h2 className="text-5xl text-center md:text-7xl laptop:text-5xl 2xl:text-7xl font-AlexBrush">
                        &
                    </h2>
                </div>

                <div className="mt-10 md:mt-14 lg:mt-28 laptop:mt-10 2xl:mt-20">
                    <h2 className="text-[2.75rem] leading-none text-center md:text-7xl laptop:text-5xl 2xl:text-7xl font-AlexBrush">
                        Almalia Deve Yanti
                    </h2>
                    <ul className="mt-2 text-xl leading-none md:text-3xl laptop:text-2xl 2xl:text-3xl md:mt-4 font-Peddana">
                        <li>Putri Pertama Bapak Soleh & Ibu Dewi</li>
                    </ul>
                </div>
            </div>

            <Cover
                open={coverModalOpen}
                setOpen={setCoverModalOpen}
                recipient={router.query.to}
            />
        </>
    )
}

export default BrideAndGroom
