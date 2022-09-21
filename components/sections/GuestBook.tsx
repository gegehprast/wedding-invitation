import React, { useCallback, useEffect, useRef, useState } from 'react'
import { getRemarks, RemarkDoc } from '../../lib/api'
import Annotation from '../Icons/Annotation'
import Mail from '../Icons/Mail'
import Amplop from '../modals/Amplop'
import Remark from '../modals/Remark'

interface GuestBookProps {
    isActive: boolean
}

const GuestBook: React.FC<GuestBookProps> = ({ isActive }) => {
    const [remarks, setRemarks] = useState<RemarkDoc[]>([])
    const [remarkModalOpen, setRemarkModalOpen] = useState(false)
    const [amplopModalOpen, setAmplopModalOpen] = useState(false)
    const [transitionDone, setTransitionDone] = useState(false)
    const messageDivRef = useRef<HTMLDivElement>(null)

    const handleTransitionEnd: React.TransitionEventHandler<
        HTMLDivElement
    > = event => {
        setTransitionDone(true)
    }

    const handleMessageWheel: React.WheelEventHandler<HTMLDivElement> = e => {
        e.stopPropagation()
    }

    const handleMessageTouch = useCallback((e: TouchEvent) => {
        e.stopPropagation()
    }, [])

    useEffect(() => {
        async function _getRemarks() {
            const remarks = await getRemarks()

            setRemarks(remarks)
        }

        _getRemarks()
    }, [])

    useEffect(() => {
        const instance = messageDivRef.current

        instance!.addEventListener('touchstart', handleMessageTouch, {
            passive: true,
        })
        instance!.addEventListener('touchmove', handleMessageTouch, {
            passive: true,
        })

        return () => {
            instance!.removeEventListener('touchstart', handleMessageTouch)
            instance!.removeEventListener('touchmove', handleMessageTouch)
        }
    }, [handleMessageTouch])

    const CLASESS = [
        transitionDone
            ? ''
            : (isActive ? 'scale-100 translate-x-0' : 'scale-0 translate-x-full pointer-events-none') +
              'transition-transform duration-[700ms] delay-[400ms] ease-in-out',
        transitionDone
            ? ''
            : (isActive ? 'scale-100 translate-x-0' : 'scale-0 translate-x-full pointer-events-none') +
              'transition-transform duration-[700ms] delay-[900ms] ease-in-out',
        transitionDone
            ? ''
            : (isActive ? 'scale-100 translate-x-0' : 'scale-0 translate-x-full pointer-events-none') +
              'transition-transform duration-[700ms] delay-[1100ms] ease-in-out',
    ]

    return (
        <>
            <div className={`${CLASESS[0]} w-full`}>
                <h1 className="text-2xl text-center md:text-4xl laptop:text-3xl 2xl:text-4xl font-HinaMincho">
                    BUKU TAMU
                </h1>
            </div>

            <div
                className={`${CLASESS[1]} flex flex-col w-full px-2 mt-8 md:px-20 laptop:px-10 2xl:px-20 md:mt-14 lg:mt-28 laptop:mt-6 2xl:mt-24 font-Inter`}
                onWheel={handleMessageWheel}
                ref={messageDivRef}
            >
                <div
                    className={`overflow-y-auto p-2 md:p-4 h-[65vh] 2xl:h-[59vh]`}
                >
                    {remarks.map(remark => (
                        <div
                            key={remark._id}
                            className="flex flex-row mb-3 md:mb-4 flex-nowrap"
                        >
                            <div className="w-full">
                                <div className="py-1 px-2 md:px-3 md:py-2 rounded-md shadow-[0_3px_15px_-7px] md:shadow-[0_3px_25px_-10px] bg-gold shadow-[color:rgba(206,240,251,1)]">
                                    <div className="flex flex-row items-center flex-nowrap">
                                        <div className="flex flex-row items-center flex-nowrap">
                                            <span className="text-xs font-bold text-blue-floral md:text-base">
                                                {remark.fullname}
                                            </span>

                                            <span className="px-2 ml-2 text-[10px] text-white rounded-lg bg-blue-floral">
                                                {remark.presenceText}
                                            </span>
                                        </div>

                                        <div className="ml-auto text-right">
                                            <span className="text-[10px] leading-tight text-blue-floral md:leading-snug md:text-xs">
                                                {new Date(
                                                    remark.createdAt
                                                ).toLocaleString('id-ID', {
                                                    dateStyle: 'full',
                                                    hourCycle: 'h23',
                                                    timeStyle: undefined,
                                                })}
                                            </span>
                                        </div>
                                    </div>

                                    <p className="mt-2 text-xs leading-tight text-blue-floral md:leading-snug md:text-base">
                                        {remark.message}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div
                className={`${CLASESS[2]} flex flex-row flex-wrap items-center justify-center w-full mt-4 font-Inter`}
                onTransitionEnd={handleTransitionEnd}
            >
                <button
                    type="button"
                    className="flex items-center px-3 py-1 mr-4 text-sm rounded-2xl bg-gold text-blue-floral hover:bg-gold2"
                    onClick={() => setRemarkModalOpen(true)}
                >
                    <span className="w-5 h-5 text-blue-floral">
                        <Annotation />
                    </span>
                    <span className="ml-1">Kirim Ucapan</span>
                </button>

                <button
                    type="button"
                    className="flex items-center px-3 py-1 text-sm rounded-2xl bg-gold text-blue-floral hover:bg-gold2"
                    onClick={() => setAmplopModalOpen(true)}
                >
                    <span className="w-5 h-5 text-blue-floral">
                        <Mail />
                    </span>
                    <span className="ml-1">Kirim Amplop</span>
                </button>
            </div>

            <Remark
                messageDivRef={messageDivRef}
                setRemarks={setRemarks}
                open={remarkModalOpen}
                setOpen={setRemarkModalOpen}
            />

            <Amplop
                messageDivRef={messageDivRef}
                setRemarks={setRemarks}
                open={amplopModalOpen}
                setOpen={setAmplopModalOpen}
            />
        </>
    )
}

export default GuestBook
