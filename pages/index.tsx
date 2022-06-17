import React, { useCallback, useEffect, useRef, useState, WheelEventHandler } from "react"

export const isNil = (value: any) => value === undefined || value === null

export const isNull = (value: any) => value === null

export const isPositiveNumber = (value: number) => value > 0

const DEFAULT_COMPONENT_INDEX = 0
const MINIMAL_DELTA_Y_DIFFERENCE = 1
const TRANSITION_DURATION = 500
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

    const scrollWindowDown = useCallback(
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
    
    const scrollWindowUp = useCallback(
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
            console.log(Math.abs(event.deltaY))
            if (Math.abs(event.deltaY) > MINIMAL_DELTA_Y_DIFFERENCE) {
                if (isPositiveNumber(event.deltaY)) {
                    lastScrolledElement.current = event.target

                    scrollWindowDown()
                } else {
                    lastScrolledElement.current = event.target

                    scrollWindowUp()
                }
            }
        },
        [scrollWindowDown, scrollWindowUp],
    )

    return (
        <main ref={scrollContainer} 
            className="bg-blue-floral overflow-hidden h-screen w-screen" 
        >
            <div ref={pageContainer} 
                className="w-full h-full outline-none transition-transform ease-in duration-500"
                onWheel={wheelScroll}
            >
                <section className="h-screen bg-red-400">

                </section>

                <section className="h-screen bg-green-400">
                    {counter}
                    <button onClick={() => setCounter(prev => prev + 1)}>click me</button>
                </section>

                <section className="h-screen bg-blue-400">
                    {counter}
                    <button onClick={() => setCounter(prev => prev + 1)}>click me</button>
                </section>

                <section className="h-screen bg-yellow-400">
                    {counter}
                    <button onClick={() => setCounter(prev => prev + 1)}>click me</button>
                </section>

                <section className="h-screen bg-violet-400">
                    {counter}
                    <button onClick={() => setCounter(prev => prev + 1)}>click me</button>
                </section>
            </div>
        </main>
    )
}

export default Home
