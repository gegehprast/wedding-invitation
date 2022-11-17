import React, { useCallback, useEffect, useRef } from 'react'
import Image from 'next/image'
import flowerCircle from '../../public/svg/flower-circle-final.svg'
import BgFlowerHorizontalUp from '../BgFlowerHorizontalUp'
import BgFlowerHorizontalDown from '../BgFlowerHorizontalDown'

interface CoverProps {
    open: boolean
    setOpen: (open: boolean) => void
    recipient: string | string[] | undefined
}

const Cover: React.FC<CoverProps> = ({ open, setOpen, recipient }) => {
    const mainDivRef = useRef<HTMLDivElement>(null)

    const handleDivTouch = useCallback((e: TouchEvent) => {
        e.stopPropagation()
    }, [])

    const handleDivWheel: React.WheelEventHandler<HTMLDivElement> = (e) => {
        e.stopPropagation()
    }

    useEffect(() => {
        const instance = mainDivRef.current

        instance!.addEventListener('touchstart', handleDivTouch, {
            passive: true,
        })
        instance!.addEventListener('touchmove', handleDivTouch, {
            passive: true,
        })

        return () => {
            instance!.removeEventListener('touchstart', handleDivTouch)
            instance!.removeEventListener('touchmove', handleDivTouch)
        }
    }, [handleDivTouch])

    return (
        <div
            className={`${
                open ? 'opacity-100' : 'opacity-0 pointer-events-none'
            } absolute top-0 left-0 w-full h-full bg-blue-floral font-Inter transition-opacity duration-[1500ms] ease-in-out`}
            onWheel={handleDivWheel}
            ref={mainDivRef}
        >
            <div className="relative w-full h-full">
                <div className="moving-bg"></div>

                <BgFlowerHorizontalUp className="top-0 left-0 pointer-events-none" />
                <BgFlowerHorizontalDown className="top-0 left-0 pointer-events-none" />

                <div className="absolute flex flex-col items-center justify-start w-full h-full py-14 md:py-28 laptop:py-20 2xl:py-28 text-gold">
                    <div className="w-full mt-6">
                        <h1 className="text-2xl text-center md:text-4xl font-HinaMincho">
                            THE WEDDING OF
                        </h1>
                    </div>

                    <div className="relative w-full mt-6">
                        <div className="px-6 md:px-20 ">
                            <Image
                                className="pointer-events-none"
                                src={flowerCircle}
                                alt="Gegeh & Alma"
                            />
                        </div>
                    </div>

                    <div className="flex flex-row items-center justify-center w-full mt-4 mb-4 text-center flex-nowrap font-HinaMincho md:mb-6 lg:mb-10">
                        <h3 className="mt-2 text-2xl md:text-3xl md:pt-3">
                            OCT
                        </h3>
                        <h2 className="mx-3 text-5xl md:text-8xl">31</h2>
                        <h3 className="mt-2 text-2xl md:text-3xl md:pt-3">
                            2022
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cover
