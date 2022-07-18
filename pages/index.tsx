import React, { useEffect, useRef, useState } from "react"
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

function getWindowDimensions() {
    if (typeof window !== "undefined") {
        const { innerWidth: width, innerHeight: height } = window

        return {
            width,
            height
        }
    }

    return {
        width: null,
        height: null,
    }
}

function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions())

    const refresh = () => {
        setWindowDimensions(getWindowDimensions())
    }

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions())
        }

        if (typeof window !== "undefined") {
            window.addEventListener('resize', handleResize)
        }

        return () => {
            if (typeof window !== "undefined") {
                window.removeEventListener('resize', handleResize)
            }
        }
    }, [])

    return { ...windowDimensions, refresh }
}

const Home = () => {
    const scrollContainer = useRef<HTMLDivElement>(null)
    const { height, refresh } = useWindowDimensions()

    useEffect(() => {
        if (height === null) {
            refresh()
        }
    }, [height, refresh])
    
    return (
        <main className="relative flex flex-row items-center justify-center w-screen bg-gray-900" style={{ height: height !== null ? `${height}px` : '100vh' }}>
            <div ref={scrollContainer} 
                className="relative w-screen h-full lg:w-[520px] lg:h-auto lg:aspect-[3/4] xl:w-[820px] xl:h-[1180px] 2xl:aspect-auto overflow-hidden text-gray-100 bg-blue-floral" 
                style={{ maxHeight: `${height}px` }}
            >
                <div className="moving-bg"></div>

                <BgFlowerHorizontalUp className="top-0 left-0 pointer-events-none" />
                <BgFlowerHorizontalDown className="top-0 left-0 pointer-events-none" />

                <div className='absolute top-0 left-0 w-full h-full'>
                    <button type='button'
                        className='absolute flex flex-col justify-center items-center text-[color:#E6C390] bottom-[2rem] right-[0.75rem] md:bottom-[4.25rem] md:right-[1.25rem]'
                    >
                        <span className="flex flex-row items-center justify-center w-10 animate-bounce-right">
                            <span className='w-4 md:w-7'>
                                <ArrowNR className="transform rotate-180" />
                            </span>

                            <span className='w-4 md:w-7'>
                                <ArrowNR />
                            </span>
                        </span>

                        <span className='text-xs text-center md:text-sm font-Inter lg:hidden'>Geser</span>
                        <span className='hidden text-xs text-center md:text-sm font-Inter lg:inline-block'>Gulir</span>
                    </button>
                </div>

                <PageContainer scrollContainer={scrollContainer}>
                    {/* main section */}
                    <section className="w-screen h-full lg:w-[520px] lg:h-auto lg:aspect-[3/4] xl:w-[820px] xl:h-[1180px] 2xl:aspect-auto py-20"
                        style={{ maxHeight: `${height}px` }}
                    >
                        <Main />
                    </section>

                    {/* bride and groom */}
                    {/* <section className="w-screen h-full lg:w-[520px] lg:h-auto lg:aspect-[3/4] xl:w-[820px] xl:h-[1180px] 2xl:aspect-auto"
                        style={{ maxHeight: `${height}px` }}
                    >
                        <BrideAndGroom />
                    </section> */}

                    {/* days countdown */}
                    <section className="w-screen h-full lg:w-[520px] lg:h-auto lg:aspect-[3/4] xl:w-[820px] xl:h-[1180px] 2xl:aspect-auto py-20"
                        style={{ maxHeight: `${height}px` }}
                    >
                        <Countdown />
                    </section>

                    {/* map */}
                    <section className="w-screen h-full lg:w-[520px] lg:h-auto lg:aspect-[3/4] xl:w-[820px] xl:h-[1180px] 2xl:aspect-auto py-20"
                        style={{ maxHeight: `${height}px` }}
                    >
                        <Map />
                    </section>

                    {/* guest book */}
                    <section className="w-screen h-full lg:w-[520px] lg:h-auto lg:aspect-[3/4] xl:w-[820px] xl:h-[1180px] 2xl:aspect-auto py-20"
                        style={{ maxHeight: `${height}px` }}
                    >
                        <GuestBook />
                    </section>

                    {/* credits */}
                    <section className="w-screen h-full lg:w-[520px] lg:h-auto lg:aspect-[3/4] xl:w-[820px] xl:h-[1180px] 2xl:aspect-auto py-20"
                        style={{ maxHeight: `${height}px` }}
                    >
                        <Credits />
                    </section>
                </PageContainer>
            </div>
        </main>
    )
}

export default Home
