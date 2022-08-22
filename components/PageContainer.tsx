import React, { useCallback, useEffect, useRef, useState, WheelEventHandler } from 'react'
import { isNil, isPositiveNumber } from '../utils/utils'

const HORIZONTAL_MODE = true
const DEFAULT_COMPONENT_INDEX = 0
const MINIMAL_DELTA_Y_DIFFERENCE = 1
const TRANSITION_DURATION = 800
const TRANSITION_BUFFER = 200

let previousTouchMove: number | null = null
let isScrolling = false
const horizontalSlideClass = 'grid grid-flow-col grid-rows-1 gap-0'
const verticalSlideClass = 'grid grid-flow-row grid-cols-1 gap-0'

const horizontalSlide = (nextComponentIndex: number) => `translate3d(${nextComponentIndex * -100}%, 0, 0)`
const verticalSlide = (nextComponentIndex: number) => `translate3d(0, ${nextComponentIndex * -100}%, 0)`

const horizontalTouch = (event: TouchEvent) => event.touches[0].clientX
const verticalTouch = (event: TouchEvent) => event.touches[0].clientY

const getSlideClass = () => HORIZONTAL_MODE ? horizontalSlideClass : verticalSlideClass
const getSlideFunction = () => HORIZONTAL_MODE ? horizontalSlide : verticalSlide
const getSlideTouch = () => HORIZONTAL_MODE ? horizontalTouch : verticalTouch

interface Props {
    children: React.ReactElement | React.ReactElement[]
    scrollContainer: React.RefObject<HTMLDivElement>
    currentIndex: number
    setCurrentIndex: (index: number) => void
}

const PageContainer: React.FC<Props> = ({ children, scrollContainer, currentIndex, setCurrentIndex }) => {
    const pageContainer = useRef<HTMLDivElement>(null)
    const [componentIndex, setComponentIndex] = useState(DEFAULT_COMPONENT_INDEX)
    const lastScrolledElement = useRef<EventTarget>()

    const scrollPage = useCallback(
        (nextComponentIndex: number) => {
            pageContainer.current!.style.transform = getSlideFunction()(nextComponentIndex)
        },
        [],
    )

    const scrollNext = useCallback(
        () => {
            if (!isScrolling) {
                if (!isNil(React.Children.toArray(children)[componentIndex + 1])) {
                    isScrolling = true
                    scrollPage(componentIndex + 1)
                    setCurrentIndex(componentIndex + 1)

                    setTimeout(() => {
                        setComponentIndex(prevState => prevState + 1)
                    }, TRANSITION_DURATION + TRANSITION_BUFFER)
                }
            }
        },
        [children, componentIndex, scrollPage, setCurrentIndex],
    )

    const scrollPrev = useCallback(
        () => {
            if (!isScrolling) {
                if (!isNil(React.Children.toArray(children)[componentIndex - 1])) {
                    isScrolling = true
                    scrollPage(componentIndex - 1)
                    setCurrentIndex(componentIndex - 1)

                    setTimeout(() => {
                        setComponentIndex(prevState => prevState - 1)
                    }, TRANSITION_DURATION + TRANSITION_BUFFER)
                }
            }
        },
        [children, componentIndex, scrollPage, setCurrentIndex],
    )

    const wheelScroll = useCallback<WheelEventHandler<HTMLDivElement>>(
        event => {
            if (Math.abs(event.deltaY) > MINIMAL_DELTA_Y_DIFFERENCE) {
                if (isPositiveNumber(event.deltaY)) {
                    lastScrolledElement.current = event.target

                    scrollNext()
                } else {
                    lastScrolledElement.current = event.target

                    scrollPrev()
                }
            }
        },
        [scrollNext, scrollPrev],
    )

    const touchStart = useCallback(
        (event: TouchEvent) => {
            if (!isScrolling) {
                previousTouchMove = getSlideTouch()(event)
            }
        },
        [],
    )

    const touchMove = useCallback(
        (event: TouchEvent) => {
            if (!isScrolling) {
                if (previousTouchMove === null) {
                    previousTouchMove = getSlideTouch()(event)
                } else {
                    const currentTouchMove = getSlideTouch()(event)
                    const delta = Math.abs(currentTouchMove - previousTouchMove)

                    if (delta < 50) {
                        return
                    }

                    if (getSlideTouch()(event) > previousTouchMove) {
                        scrollPrev()
                    } else {
                        scrollNext()
                    }
                }
            }
        },
        [scrollNext, scrollPrev],
    )

    useEffect(() => {
        previousTouchMove = null
        isScrolling = false
    }, [componentIndex])

    useEffect(() => {
        const instance = scrollContainer.current

        instance!.addEventListener('touchstart', touchStart, { passive: true })
        instance!.addEventListener('touchmove', touchMove, { passive: true })

        return () => {
            instance!.removeEventListener('touchstart', touchStart)
            instance!.removeEventListener('touchmove', touchMove)
        }
    }, [scrollContainer, touchMove, touchStart])

    // it just works
    useEffect(() => {
        if (currentIndex === -1 && componentIndex === 0) {
            scrollNext()
        }
    }, [currentIndex, scrollNext, componentIndex])
    

    return (
        <div ref={pageContainer}
            className={`${getSlideClass()} w-full h-full transition-transform ease-in-out outline-none`}
            style={{ transitionDuration: `${TRANSITION_DURATION}ms`, transform: 'translate3d(0px, 0px, 0px)' }}
            onWheel={wheelScroll}
        >
            {React.Children.map(children, (child) => {
                if (React.isValidElement(child)) {
                    // set the map prop on the child component
                    return React.cloneElement(child)
                }
            })}
        </div>
    )
}

export default PageContainer
