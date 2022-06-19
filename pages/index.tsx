import React, { useRef, useState } from "react"
import BgFlowerHorizontalDown from "../components/BgFlowerHorizontalDown"
import BgFlowerHorizontalUp from "../components/BgFlowerHorizontalUp"
import PageContainer from "../components/PageContainer"

const Home = () => {
    const [counter, setCounter] = useState(0)
    const scrollContainer = useRef<HTMLDivElement>(null)
    
    return (
        <main ref={scrollContainer} 
            className="relative w-screen h-screen overflow-hidden text-gray-100 bg-blue-floral bg-[url(/svg/flower-tile.svg)] bg-repeat bg-contain"
        >
            <BgFlowerHorizontalUp className="top-0 left-0 pointer-events-none" />
            <BgFlowerHorizontalDown className="top-0 left-0 pointer-events-none" />
            
            <PageContainer scrollContainer={scrollContainer}>
                <section className="relative w-screen h-screen bg-red-400 bg-opacity-30">
                    <div className="flex items-center justify-center w-full h-full">
                        <button onClick={() => setCounter(prev => prev + 1)}>CLICK ME 1: </button>
                        <span className="ml-1">{counter}</span>
                    </div>


                </section>

                <section className="relative w-screen h-screen bg-green-400 bg-opacity-30">
                    <div className="flex items-center justify-center w-full h-full">
                        <button onClick={() => setCounter(prev => prev + 1)}>CLICK ME 2: </button>
                        <span className="ml-1">{counter}</span>
                    </div>


                </section>

                <section className="relative w-screen h-screen bg-blue-400 bg-opacity-30">
                    <div className="flex items-center justify-center w-full h-full">
                        <button onClick={() => setCounter(prev => prev + 1)}>CLICK ME 3: </button>
                        <span className="ml-1">{counter}</span>
                    </div>


                </section>

                <section className="relative w-screen h-screen bg-yellow-400 bg-opacity-30">
                    <div className="flex items-center justify-center w-full h-full">
                        <button onClick={() => setCounter(prev => prev + 1)}>CLICK ME 4: </button>
                        <span className="ml-1">{counter}</span>
                    </div>


                </section>

                <section className="relative w-screen h-screen bg-opacity-30 bg-violet-400">
                    <div className="flex items-center justify-center w-full h-full">
                        <button onClick={() => setCounter(prev => prev + 1)}>CLICK ME 5: </button>
                        <span className="ml-1">{counter}</span>
                    </div>


                </section>
            </PageContainer>
        </main>
    )
}

export default Home
