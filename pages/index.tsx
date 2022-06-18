import React, { useCallback, useEffect, useRef, useState, WheelEventHandler } from "react"
import BgFlowerBig from "../components/BgFlowerBig"
import BgFlowerHorizontal from "../components/BgFlowerHorizontal"
import BgFlowerHorizontalDown from "../components/BgFlowerHorizontalDown"
import BgFlowerHorizontalUp from "../components/BgFlowerHorizontalUp"
import { isNil, isPositiveNumber } from "../utils/utils"

const DEFAULT_COMPONENT_INDEX = 0
const MINIMAL_DELTA_Y_DIFFERENCE = 1
const TRANSITION_DURATION = 800
const TRANSITION_BUFFER = 200

let isScrolling = false
const containers = [true, true, true, true, true]

const Home = () => {
    const [counter, setCounter] = useState(0)
    const [componentIndex, setComponentIndex] = useState(DEFAULT_COMPONENT_INDEX)
    const scrollContainer = useRef<HTMLDivElement>(null)
    const pageContainer = useRef<HTMLDivElement>(null)
    const lastScrolledElement = useRef<EventTarget>()

    const scrollPage = useCallback(
        (nextComponentIndex: number) => {
            pageContainer.current!.style.transform = `translate3d(0, ${nextComponentIndex * -100}%, 0)`
        },
        [],
    )

    const scrollNext = useCallback(
        () => {
            if (!isScrolling) {
                if (!isNil(containers[componentIndex + 1])) {
                    isScrolling = true
                    scrollPage(componentIndex + 1)

                    setTimeout(() => {
                        setComponentIndex(prevState => prevState + 1)
                    }, TRANSITION_DURATION + TRANSITION_BUFFER)
                }
            }
        },
        [componentIndex, scrollPage],
    )
    
    const ScrollPrev = useCallback(
        () => {
            if (!isScrolling) {
                if (!isNil(containers[componentIndex - 1])) {
                    isScrolling = true
                    scrollPage(componentIndex - 1)

                    setTimeout(() => {
                        setComponentIndex(prevState => prevState - 1)
                    }, TRANSITION_DURATION + TRANSITION_BUFFER)
                }
            }
        },
        [componentIndex, scrollPage],
    )

    useEffect(() => {
        isScrolling = false
    }, [componentIndex])

    const wheelScroll = useCallback<WheelEventHandler<HTMLDivElement>>(
        event => {
            if (Math.abs(event.deltaY) > MINIMAL_DELTA_Y_DIFFERENCE) {
                if (isPositiveNumber(event.deltaY)) {
                    lastScrolledElement.current = event.target

                    scrollNext()
                } else {
                    lastScrolledElement.current = event.target

                    ScrollPrev()
                }
            }
        },
        [scrollNext, ScrollPrev],
    )

    return (
        <main ref={scrollContainer} 
            className="w-screen h-screen overflow-hidden text-gray-100 bg-blue-floral"
        >
            <div ref={pageContainer} 
                className="grid w-full h-full grid-flow-row grid-cols-1 gap-0 transition-transform ease-in-out outline-none" 
                style={{ transitionDuration: `${TRANSITION_DURATION}ms`, transform: 'translate3d(0px, 0px, 0px)' }}
                onWheel={wheelScroll}
            >
                <section className="relative w-screen h-screen bg-red-400 bg-opacity-0">
                    <button onClick={() => setCounter(prev => prev + 1)}>Click me: </button>
                    <span>{counter}</span>
                    
                    {/* <BgFlowerBig className="top-0 left-0 -z-10"/> */}
                    {/* <BgFlowerBig className="top-0 left-0 rotate-180 -z-10"/> */}
                    {/* <BgFlowerHorizontal className="top-0 left-0 -z-10" /> */}
                    <BgFlowerHorizontalUp className="top-0 left-0 -z-10" />
                    <BgFlowerHorizontalDown className="top-0 left-0 -z-10" />
                </section>

                <section className="relative w-screen h-screen bg-green-400 bg-opacity-0">
                    <button onClick={() => setCounter(prev => prev + 1)}>Click me: </button>
                    <span>{counter}</span>
                    
                    {/* <BgFlowerBig className="top-0 left-0 -z-10"/> */}
                    {/* <BgFlowerBig className="top-0 left-0 rotate-180 -z-10"/> */}
                    {/* <BgFlowerHorizontal className="top-0 left-0 -z-10" /> */}
                    <BgFlowerHorizontalUp className="top-0 left-0 -z-10" />
                    <BgFlowerHorizontalDown className="top-0 left-0 -z-10" />
                </section>

                <section className="relative w-screen h-screen bg-blue-400 bg-opacity-0">
                    <button onClick={() => setCounter(prev => prev + 1)}>Click me: </button>
                    <span>{counter}</span>
                    
                    {/* <BgFlowerBig className="top-0 left-0 -z-10"/> */}
                    {/* <BgFlowerBig className="top-0 left-0 rotate-180 -z-10"/> */}
                    {/* <BgFlowerHorizontal className="top-0 left-0 -z-10" /> */}
                    <BgFlowerHorizontalUp className="top-0 left-0 -z-10" />
                    <BgFlowerHorizontalDown className="top-0 left-0 -z-10" />
                </section>

                <section className="relative w-screen h-screen bg-yellow-400 bg-opacity-0">
                    <button onClick={() => setCounter(prev => prev + 1)}>Click me: </button>
                    <span>{counter}</span>
                    
                    {/* <BgFlowerBig className="top-0 left-0 -z-10"/> */}
                    {/* <BgFlowerBig className="top-0 left-0 rotate-180 -z-10"/> */}
                    {/* <BgFlowerHorizontal className="top-0 left-0 -z-10" /> */}
                    <BgFlowerHorizontalUp className="top-0 left-0 -z-10" />
                    <BgFlowerHorizontalDown className="top-0 left-0 -z-10" />
                </section>

                <section className="relative w-screen h-screen bg-opacity-0 bg-violet-400">
                    <button onClick={() => setCounter(prev => prev + 1)}>Click me: </button>
                    <span>{counter}</span>
                    
                    {/* <BgFlowerBig className="top-0 left-0 -z-10"/> */}
                    {/* <BgFlowerBig className="top-0 left-0 rotate-180 -z-10"/> */}
                    {/* <BgFlowerHorizontal className="top-0 left-0 -z-10" /> */}
                    <BgFlowerHorizontalUp className="top-0 left-0 -z-10" />
                    <BgFlowerHorizontalDown className="top-0 left-0 -z-10" />
                </section>
            </div>
        </main>
    )
}

export default Home
