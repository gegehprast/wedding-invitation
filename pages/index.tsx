import React, { useRef, useState } from "react"
import BgFlowerHorizontalDown from "../components/BgFlowerHorizontalDown"
import BgFlowerHorizontalUp from "../components/BgFlowerHorizontalUp"
import PageContainer from "../components/PageContainer"
import BrideAndGroom from "../components/sections/BrideAndGroom"
import Credits from "../components/sections/Credits"
import GuestBook from "../components/sections/GuestBook"
import Main from "../components/sections/Main"
import dynamic from 'next/dynamic'
import ArrowCR from "../components/Icons/ArrowCR"
import ArrowNR from "../components/Icons/ArrowNR"

const Countdown = dynamic(() => import('../components/sections/Countdown'), { ssr: false })
const Map = dynamic(() => import('../components/sections/Map'), { ssr: false })

const Home = () => {
    const scrollContainer = useRef<HTMLDivElement>(null)
    
    return (
        <main className="relative flex flex-row items-center justify-center w-screen h-screen bg-gray-900">
            <div ref={scrollContainer} className="relative w-screen h-screen max-h-screen lg:w-[520px] lg:h-auto lg:aspect-[3/4] xl:w-[820px] xl:h-[1180px] 2xl:aspect-auto overflow-hidden text-gray-100 bg-blue-floral">
                <div className="moving-bg"></div>

                <BgFlowerHorizontalUp className="top-0 left-0 pointer-events-none" />
                <BgFlowerHorizontalDown className="top-0 left-0 pointer-events-none" />

                <div className='absolute top-0 left-0 w-full h-full'>
                    <button type='button'
                        className='absolute flex flex-col justify-center items-center text-[color:#E6C390] bottom-[1.75rem] right-[0.75rem] md:bottom-[4.25rem] md:right-[1.25rem]'
                    >
                        <span className="flex flex-row items-center justify-center w-10">
                            <span className='w-5 animate-bounce-right md:w-7'>
                                <ArrowNR className="transform rotate-180" />
                            </span>

                            <span className='w-5 animate-bounce-right md:w-7'>
                                <ArrowNR />
                            </span>
                        </span>

                        <span className='text-xs text-center md:text-sm font-Inter lg:hidden'>Geser</span>
                        <span className='hidden text-xs text-center md:text-sm font-Inter lg:inline-block'>Gulir</span>
                    </button>
                </div>

                <PageContainer scrollContainer={scrollContainer}>
                    {/* main section */}
                    <section className="w-screen h-screen max-h-screen lg:w-[520px] lg:h-auto lg:aspect-[3/4] xl:w-[820px] xl:h-[1180px] 2xl:aspect-auto py-20">
                        <Main />
                    </section>

                    {/* bride and groom */}
                    {/* <section className="w-screen h-screen max-h-screen lg:w-[520px] lg:h-auto lg:aspect-[3/4] xl:w-[820px] xl:h-[1180px] 2xl:aspect-auto">
                        <BrideAndGroom />
                    </section> */}

                    {/* days countdown */}
                    <section className="w-screen h-screen max-h-screen lg:w-[520px] lg:h-auto lg:aspect-[3/4] xl:w-[820px] xl:h-[1180px] 2xl:aspect-auto py-20">
                        <Countdown />
                    </section>

                    {/* map */}
                    <section className="w-screen h-screen max-h-screen lg:w-[520px] lg:h-auto lg:aspect-[3/4] xl:w-[820px] xl:h-[1180px] 2xl:aspect-auto py-20">
                        <Map />
                    </section>

                    {/* guest book */}
                    <section className="w-screen h-screen max-h-screen lg:w-[520px] lg:h-auto lg:aspect-[3/4] xl:w-[820px] xl:h-[1180px] 2xl:aspect-auto py-20">
                        <GuestBook />
                    </section>

                    {/* credits */}
                    <section className="w-screen h-screen max-h-screen lg:w-[520px] lg:h-auto lg:aspect-[3/4] xl:w-[820px] xl:h-[1180px] 2xl:aspect-auto py-20">
                        <Credits />
                    </section>
                </PageContainer>
            </div>
        </main>
    )
}

export default Home
