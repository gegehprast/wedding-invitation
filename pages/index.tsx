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
            
            <PageContainer>
                <section className="relative w-screen h-screen bg-red-400 bg-opacity-0">
                    <button onClick={() => setCounter(prev => prev + 1)}>Click me: </button>
                    <span>{counter}</span>


                </section>

                <section className="relative w-screen h-screen bg-green-400 bg-opacity-0">
                    <button onClick={() => setCounter(prev => prev + 1)}>Click me: </button>
                    <span>{counter}</span>


                </section>

                <section className="relative w-screen h-screen bg-blue-400 bg-opacity-0">
                    <button onClick={() => setCounter(prev => prev + 1)}>Click me: </button>
                    <span>{counter}</span>


                </section>

                <section className="relative w-screen h-screen bg-yellow-400 bg-opacity-0">
                    <button onClick={() => setCounter(prev => prev + 1)}>Click me: </button>
                    <span>{counter}</span>


                </section>

                <section className="relative w-screen h-screen bg-opacity-0 bg-violet-400">
                    <button onClick={() => setCounter(prev => prev + 1)}>Click me: </button>
                    <span>{counter}</span>


                </section>
            </PageContainer>
        </main>
    )
}

export default Home
