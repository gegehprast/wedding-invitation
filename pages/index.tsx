import React, { useRef, useState } from "react"
import BgFlowerHorizontalDown from "../components/BgFlowerHorizontalDown"
import BgFlowerHorizontalUp from "../components/BgFlowerHorizontalUp"
import PageContainer from "../components/PageContainer"
import BrideAndGroom from "../components/sections/BrideAndGroom"
import Credits from "../components/sections/Credits"
import GuestBook from "../components/sections/GuestBook"
import Main from "../components/sections/Main"
import dynamic from 'next/dynamic'

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

                <PageContainer scrollContainer={scrollContainer}>
                    {/* main section */}
                    <section className="w-screen h-screen max-h-screen lg:w-[520px] lg:h-auto lg:aspect-[3/4] xl:w-[820px] xl:h-[1180px] 2xl:aspect-auto">
                        <Main />
                    </section>

                    {/* bride and groom */}
                    {/* <section className="w-screen h-screen max-h-screen lg:w-[520px] lg:h-auto lg:aspect-[3/4] xl:w-[820px] xl:h-[1180px] 2xl:aspect-auto">
                        <BrideAndGroom />
                    </section> */}

                    {/* days countdown */}
                    <section className="w-screen h-screen max-h-screen lg:w-[520px] lg:h-auto lg:aspect-[3/4] xl:w-[820px] xl:h-[1180px] 2xl:aspect-auto">
                        <Countdown />
                    </section>

                    {/* map */}
                    <section className="w-screen h-screen max-h-screen lg:w-[520px] lg:h-auto lg:aspect-[3/4] xl:w-[820px] xl:h-[1180px] 2xl:aspect-auto">
                        <Map />
                    </section>

                    {/* guest book */}
                    <section className="w-screen h-screen max-h-screen lg:w-[520px] lg:h-auto lg:aspect-[3/4] xl:w-[820px] xl:h-[1180px] 2xl:aspect-auto">
                        <GuestBook />
                    </section>

                    {/* credits */}
                    <section className="w-screen h-screen max-h-screen lg:w-[520px] lg:h-auto lg:aspect-[3/4] xl:w-[820px] xl:h-[1180px] 2xl:aspect-auto">
                        <Credits />
                    </section>
                </PageContainer>
            </div>
        </main>
    )
}

export default Home
