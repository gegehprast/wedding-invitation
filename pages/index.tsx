import React, { useRef, useState } from "react"
import BgFlowerHorizontalDown from "../components/BgFlowerHorizontalDown"
import BgFlowerHorizontalUp from "../components/BgFlowerHorizontalUp"
import PageContainer from "../components/PageContainer"
import BrideAndGroom from "../components/sections/BrideAndGroom"
import Countdown from "../components/sections/Countdown"
import Credits from "../components/sections/Credits"
import GuestBook from "../components/sections/GuestBook"
import Main from "../components/sections/Main"
import Map from "../components/sections/Map"

const Home = () => {
    const scrollContainer = useRef<HTMLDivElement>(null)

    return (
        <main className="relative flex flex-row items-center justify-center w-screen h-screen bg-white">
            <div ref={scrollContainer} className="relative w-screen h-screen md:w-[820px] md:h-[1180px] overflow-hidden text-gray-100 bg-blue-floral bg-[url(/svg/flower-tile.svg)] bg-repeat bg-contain">
                <BgFlowerHorizontalUp className="top-0 left-0 pointer-events-none" />
                <BgFlowerHorizontalDown className="top-0 left-0 pointer-events-none" />

                <PageContainer scrollContainer={scrollContainer}>
                    {/* main section */}
                    <section className="w-screen h-screen md:w-[820px] md:h-[1180px]">
                        <Main />
                    </section>

                    {/* bride and groom */}
                    <section className="w-screen h-screen md:w-[820px] md:h-[1180px]">
                        <BrideAndGroom />
                    </section>

                    {/* days countdown */}
                    <section className="w-screen h-screen md:w-[820px] md:h-[1180px]">
                        <Countdown />
                    </section>

                    {/* map */}
                    <section className="w-screen h-screen md:w-[820px] md:h-[1180px]">
                        <Map />
                    </section>

                    {/* guest book */}
                    <section className="w-screen h-screen md:w-[820px] md:h-[1180px]">
                        <GuestBook />
                    </section>

                    {/* credits */}
                    <section className="w-screen h-screen md:w-[820px] md:h-[1180px]">
                        <Credits />
                    </section>
                </PageContainer>
            </div>
        </main>
    )
}

export default Home
