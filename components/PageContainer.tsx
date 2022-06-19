import React, { useCallback, useEffect, useRef, useState, WheelEventHandler } from 'react'
import { isNil, isNull, isPositiveNumber } from '../utils/utils'

const HORIZONTAL_MODE = false
const DEFAULT_COMPONENT_INDEX = 0
const MINIMAL_DELTA_Y_DIFFERENCE = 1
const TRANSITION_DURATION = 800
const TRANSITION_BUFFER = 200

let previousTouchMove: number | null = null;
let isScrolling = false
const horizontalSlideClass = 'grid grid-flow-col grid-rows-1 gap-0';
const verticalSlideClass = 'grid grid-flow-row grid-cols-1 gap-0';

const horizontalSlide = (nextComponentIndex: number) => `translate3d(${nextComponentIndex * -100}%, 0, 0)`
const verticalSlide = (nextComponentIndex: number) => `translate3d(0, ${nextComponentIndex * -100}%, 0)`

const getSlideClass = () => HORIZONTAL_MODE ? horizontalSlideClass : verticalSlideClass
const getSlideFunction = () => HORIZONTAL_MODE ? horizontalSlide : verticalSlide

interface Props {
    children: React.ReactElement[],
    scrollContainer: React.RefObject<HTMLDivElement>
}

const PageContainer: React.FC<Props> = ({ children, scrollContainer }) => {
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
                if (!isNil(children[componentIndex + 1])) {
                    isScrolling = true
                    scrollPage(componentIndex + 1)

                    setTimeout(() => {
                        setComponentIndex(prevState => prevState + 1)
                    }, TRANSITION_DURATION + TRANSITION_BUFFER)
                }
            }
        },
        [children, componentIndex, scrollPage],
    )

    const scrollPrev = useCallback(
        () => {
            if (!isScrolling) {
                if (!isNil(children[componentIndex - 1])) {
                    isScrolling = true
                    scrollPage(componentIndex - 1)

                    setTimeout(() => {
                        setComponentIndex(prevState => prevState - 1)
                    }, TRANSITION_DURATION + TRANSITION_BUFFER)
                }
            }
        },
        [children, componentIndex, scrollPage],
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
            console.log(previousTouchMove)
            if (!isScrolling) {
                previousTouchMove = event.touches[0].clientY;
            }
        },
        [],
    );

    const touchMove = useCallback(
        (event: TouchEvent) => {
            console.log(previousTouchMove)
            if (!isScrolling) {
                if (!isNull(previousTouchMove)) {
                    if (event.touches[0].clientY > previousTouchMove!) {
                        scrollPrev();
                    } else {
                        scrollNext();
                    }
                } else {
                    previousTouchMove = event.touches[0].clientY;
                }
            }
        },
        [scrollNext, scrollPrev],
    );

    useEffect(() => {
        previousTouchMove = null
        isScrolling = false
    }, [componentIndex])

    useEffect(() => {
        const instance = scrollContainer.current;

        instance!.addEventListener('touchstart', touchStart);
        instance!.addEventListener('touchmove', touchMove);

        return () => {
            instance!.removeEventListener('touchstart', touchStart);
            instance!.removeEventListener('touchmove', touchMove);
        };
    }, [scrollContainer, touchMove, touchStart])

    return (
        <div ref={pageContainer}
            className={`${getSlideClass()} w-full h-full transition-transform ease-in-out outline-none`}
            style={{ transitionDuration: `${TRANSITION_DURATION}ms`, transform: 'translate3d(0px, 0px, 0px)' }}
            onWheel={wheelScroll}
        >
            {children}
        </div>
    )
}

export default PageContainer
