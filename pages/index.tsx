import React, { useEffect, useRef, useState } from "react"
import Head from 'next/head'
import BgFlowerHorizontalDown from "../components/BgFlowerHorizontalDown"
import BgFlowerHorizontalUp from "../components/BgFlowerHorizontalUp"
import PageContainer from "../components/PageContainer"
import BrideAndGroom from "../components/sections/BrideAndGroom"
import Credits from "../components/sections/Credits"
import GuestBook from "../components/sections/GuestBook"
import Main from "../components/sections/Main"
import dynamic from 'next/dynamic'
import ArrowNR from "../components/Icons/ArrowNR"
import { getWindowDimensions } from "../utils/utils"

const Countdown = dynamic(() => import('../components/sections/Countdown'), { ssr: false })
const Map = dynamic(() => import('../components/sections/Map'), { ssr: false })

const WIDTH_CLASS = 'w-screen h-full lg:w-[520px] lg:h-auto lg:aspect-[3/4] xl:w-[820px] xl:h-[1180px] laptop:w-[640px] laptop:aspect-auto 2xl:w-[860px] xl:h-[1220px] 2xl:aspect-auto'

function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState<{ width?: number, height?: number }>({})

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
    const [currentIndex, setCurrentIndex] = useState(0)
    const scrollContainer = useRef<HTMLDivElement>(null)
    const { height, refresh } = useWindowDimensions()

    useEffect(() => {
        refresh()
    }, [refresh])

    return (
        <main
            className="relative flex flex-row items-center justify-center w-screen bg-gray-900"
            style={{ height: `${height}px` }}
        >
            <Head>
                <title>Undangan Pernikahan Almalia & Gigih</title>
                <meta
                    name="viewport"
                    content="initial-scale=1.0, width=device-width"
                />
                <link rel="shortcut icon" href="/favicon.png" />
            </Head>

            <div
                ref={scrollContainer}
                className={`${WIDTH_CLASS} relative overflow-hidden text-gray-100 bg-blue-floral`}
                style={{ maxHeight: `${height}px` }}
            >
                <div className="moving-bg"></div>

                <BgFlowerHorizontalUp className="top-0 left-0 pointer-events-none" />
                <BgFlowerHorizontalDown className="top-0 left-0 pointer-events-none" />

                <div className="absolute top-0 left-0 w-full h-full">
                    <button
                        type="button"
                        className="absolute flex flex-col justify-center items-center text-gold bottom-[2rem] right-[0.75rem] md:bottom-[4.25rem] md:right-[1.25rem]"
                    >
                        <span className="flex flex-row items-center justify-center w-10 animate-bounce-right">
                            <span className="w-4 md:w-7">
                                <ArrowNR className="transform rotate-180" />
                            </span>

                            <span className="w-4 md:w-7">
                                <ArrowNR />
                            </span>
                        </span>

                        <span className="text-xs text-center md:text-sm font-Inter lg:hidden">
                            Geser
                        </span>
                        <span className="hidden text-xs text-center md:text-sm font-Inter lg:inline-block">
                            Gulir
                        </span>
                    </button>
                </div>

                <PageContainer
                    scrollContainer={scrollContainer}
                    currentIndex={currentIndex}
                    setCurrentIndex={setCurrentIndex}
                >
                    {/* bride and groom */}
                    <section
                        className={`${WIDTH_CLASS} py-10 md:py-20 laptop:py-16 2xl:py-20`}
                        style={{ maxHeight: `${height}px` }}
                    >
                        <div className="flex flex-col items-center justify-start w-full h-full py-6 md:py-20 laptop:py-6 2xl:py-16 text-gold">
                            <BrideAndGroom />
                        </div>
                    </section>

                    {/* days countdown */}
                    <section
                        className={`${WIDTH_CLASS} py-10 md:py-20 laptop:py-16 2xl:py-20`}
                        style={{ maxHeight: `${height}px` }}
                    >
                        <div className="relative flex flex-col items-center justify-start w-full h-full py-6 md:py-20 laptop:py-6 2xl:py-16 text-gold">
                            <Countdown />
                        </div>
                    </section>

                    {/* map */}
                    <section
                        className={`${WIDTH_CLASS} py-10 md:py-20 laptop:py-16 2xl:py-20`}
                        style={{ maxHeight: `${height}px` }}
                    >
                        <div className="relative flex flex-col items-center justify-start w-full h-full py-6 md:py-20 laptop:py-6 2xl:py-16 text-gold">
                            <Map />
                        </div>
                    </section>

                    {/* guest book */}
                    <section
                        className={`${WIDTH_CLASS} py-10 md:py-20 laptop:py-16 2xl:py-20 relative`}
                        style={{ maxHeight: `${height}px` }}
                    >
                        <div className="flex flex-col items-center justify-start w-full h-full py-6 md:py-20 laptop:py-6 2xl:py-16 text-gold">
                            <GuestBook />
                        </div>
                    </section>

                    {/* credits */}
                    <section
                        className={`${WIDTH_CLASS} py-10 md:py-20 laptop:py-16 2xl:py-20`}
                        style={{ maxHeight: `${height}px` }}
                    >
                        <div className="relative flex flex-col items-center justify-start w-full h-full py-6 md:py-20 laptop:py-6 2xl:py-16 text-gold">
                            <Credits />
                        </div>
                    </section>
                </PageContainer>
            </div>
        </main>
    )
}

export default Home
