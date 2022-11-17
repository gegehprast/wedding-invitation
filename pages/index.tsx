import React, { useEffect, useRef, useState } from "react"
import Head from 'next/head'
import BgFlowerHorizontalDown from "../components/BgFlowerHorizontalDown"
import BgFlowerHorizontalUp from "../components/BgFlowerHorizontalUp"
import PageContainer from "../components/PageContainer"
import BrideAndGroom from "../components/sections/BrideAndGroom"
import Credits from "../components/sections/Credits"
import GuestBook from "../components/sections/GuestBook"
import dynamic from 'next/dynamic'
import ArrowNR from "../components/Icons/ArrowNR"
import { getWindowDimensions } from "../utils/utils"
import { GetServerSideProps } from "next"
import Prokes from "../components/sections/Prokes"
import Thanks from "../components/sections/Thanks"
import Image from "next/image"
import Anya from '../public/anya.png'
import Speaker from "../components/Icons/Speaker"
import SpeakerX from "../components/Icons/SpeakerX"

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

const createAudioInstance = () => {
    const audio = new Audio()
    return audio
}

const Home = () => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [coverModalOpen, setCoverModalOpen] = useState(true)
    const [isPlaying, setIsPlaying] = useState(false)
    const [isMuted, setIsMuted] = useState(false)
    const scrollContainer = useRef<HTMLDivElement>(null)
    const audioRef = useRef<HTMLAudioElement>()
    const { height, refresh } = useWindowDimensions()

    const handleSound = () => {
        if (!audioRef.current) {
            return
        }

        audioRef.current.muted = !isMuted

        setIsMuted(!isMuted)
    }

    const playAudio = async () => {
        return
    }
    
    useEffect(() => {
        refresh()
    }, [refresh])

    useEffect(() => {
        if (coverModalOpen === false) {
            playAudio()
        }
    }, [coverModalOpen])
    
    useEffect(() => {
        audioRef.current = createAudioInstance()
    }, [])

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
                <meta
                    name="description"
                    content="Undangan Pernikahan Almalia & Gigih"
                />
                <meta
                    name="keywords"
                    content="Wedding Invitation"
                />
                <meta
                    name="author"
                    content="Gegeh Prast"
                />
                <meta
                    property="og:url"
                    content="https://almalia.dev"
                />
                <meta
                    property="og:type"
                    content="website"
                />
                <meta
                    property="og:title"
                    content="Undangan Pernikahan Almalia & Gigih"
                />
                <meta
                    property="og:description"
                    content="Undangan Pernikahan Almalia & Gigih."
                />
                <meta
                    property="og:image"
                    content="https://almalia.dev/svg/FlowerCircleFinalSmall.png"
                />
                <meta
                    property="og:image:alt"
                    content="Gegeh & Alma"
                />
                <meta
                    property="og:locale"
                    content="id_ID"
                />
                <link
                    rel="shortcut icon"
                    href="/favicon.png"
                />
                <link
                    rel="canonical"
                    href="https://almalia.dev"
                />
            </Head>

            <div
                ref={scrollContainer}
                className={`${WIDTH_CLASS} relative overflow-hidden text-gray-100 bg-blue-floral`}
                style={{ maxHeight: `${height}px` }}
            >
                <div className="moving-bg"></div>

                <BgFlowerHorizontalUp className="top-0 left-0 pointer-events-none" />
                <BgFlowerHorizontalDown className="top-0 left-0 pointer-events-none" />

                {currentIndex === 5 && (
                    <div className="absolute bottom-0 right-0 pointer-events-none w-[80px] h-[62.27px]">
                        <Image
                            width={80}
                            height={62.27}
                            src={Anya}
                            alt="anya"
                        />
                    </div>
                )}

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
                            <BrideAndGroom
                                isActive={currentIndex === 0}
                                coverModalOpen={coverModalOpen}
                                setCoverModalOpen={setCoverModalOpen}
                            />
                        </div>
                    </section>

                    {/* days countdown */}
                    <section
                        className={`${WIDTH_CLASS} py-10 md:py-20 laptop:py-16 2xl:py-20`}
                        style={{ maxHeight: `${height}px` }}
                    >
                        <div className="relative flex flex-col items-center justify-start w-full h-full py-6 md:py-20 laptop:py-6 2xl:py-16 text-gold">
                            <Countdown
                                isActive={currentIndex === 1}
                                setCurrentIndex={setCurrentIndex}
                            />
                        </div>
                    </section>

                    {/* map */}
                    <section
                        className={`${WIDTH_CLASS} py-10 md:py-20 laptop:py-16 2xl:py-20`}
                        style={{ maxHeight: `${height}px` }}
                    >
                        <div className="relative flex flex-col items-center justify-start w-full h-full py-6 md:py-20 laptop:py-6 2xl:py-16 text-gold">
                            <Map isActive={currentIndex === 2} />
                        </div>
                    </section>

                    {/* guest book */}
                    <section
                        className={`${WIDTH_CLASS} py-10 md:py-20 laptop:py-16 2xl:py-20 relative`}
                        style={{ maxHeight: `${height}px` }}
                    >
                        <div className="flex flex-col items-center justify-start w-full h-full py-6 md:py-20 laptop:py-6 2xl:py-16 text-gold">
                            <GuestBook isActive={currentIndex === 3} />
                        </div>
                    </section>

                    {/* prokes */}
                    <section
                        className={`${WIDTH_CLASS} py-10 md:py-20 laptop:py-16 2xl:py-20`}
                        style={{ maxHeight: `${height}px` }}
                    >
                        <div className="relative flex flex-col items-center justify-start w-full h-full py-6 md:py-20 laptop:py-6 2xl:py-16 text-gold">
                            <Prokes isActive={currentIndex === 4} />
                        </div>
                    </section>

                    {/* Thanks */}
                    <section
                        className={`${WIDTH_CLASS} py-10 md:py-20 laptop:py-16 2xl:py-20`}
                        style={{ maxHeight: `${height}px` }}
                    >
                        <div className="relative flex flex-col items-center justify-start w-full h-full py-6 md:py-20 laptop:py-6 2xl:py-16 text-gold">
                            <Thanks isActive={currentIndex === 5} />
                        </div>
                    </section>
                </PageContainer>

                {!coverModalOpen && (
                    <div className="absolute left-0 w-full bottom-[4rem] md:bottom-[5.5rem]">
                        <button
                            type="button"
                            className="absolute flex flex-col justify-center items-center text-gold right-[0.75rem] md:right-[1.25rem] cursor-default"
                        >
                            <span className="flex flex-row items-center justify-center w-10 animate-bounce-right">
                                {currentIndex !== 0 && (
                                    <span className="w-4 md:w-7">
                                        <ArrowNR className="transform rotate-180" />
                                    </span>
                                )}

                                {currentIndex !== 5 && (
                                    <span className="w-4 md:w-7">
                                        <ArrowNR />
                                    </span>
                                )}
                            </span>

                            <span className="text-xs text-center md:text-sm font-Inter lg:hidden">
                                Geser
                            </span>
                            <span className="hidden text-xs text-center md:text-sm font-Inter lg:inline-block">
                                Gulir
                            </span>
                        </button>
                    </div>
                )}
            </div>
        </main>
    )
}

export const getServerSideProps: GetServerSideProps = async () => {
    return {
        props: {},
    }
}

export default Home
