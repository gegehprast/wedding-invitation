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
        <main ref={scrollContainer} 
            className="relative w-screen h-screen overflow-hidden text-gray-100 bg-blue-floral bg-[url(/svg/flower-tile.svg)] bg-repeat bg-contain"
        >
            <BgFlowerHorizontalUp className="top-0 left-0 pointer-events-none" />
            <BgFlowerHorizontalDown className="top-0 left-0 pointer-events-none" />
            
            <PageContainer scrollContainer={scrollContainer}>
                {/* main section */}
                <Main />

                {/* bride and groom */}
                <BrideAndGroom />
                
                {/* days countdown */}
                <Countdown />

                {/* map */}
                <Map />
                
                {/* guest book */}
                <GuestBook />

                {/* credits */}
                <Credits />
            </PageContainer>
        </main>
    )
}

export default Home
