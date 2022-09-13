import React, { useCallback, useEffect, useRef, useState } from 'react'
import { getRemarks, RemarkDoc, storeRemark } from '../../lib/api'

interface RemarkProps {
    messageDivRef: React.RefObject<HTMLDivElement>
    setRemarks: React.Dispatch<React.SetStateAction<RemarkDoc[]>>
    open: boolean
    setOpen: (open: boolean) => void
}

const Remark: React.FC<RemarkProps> = ({ messageDivRef, setRemarks, open, setOpen }) => {
    const [fullname, setFullname] = useState('')
    const [message, setMessage] = useState('')
    const [presence, setPresence] = useState(0)
    const [submitting, setSubmitting] = useState(false)
    const mainDivRef = useRef<HTMLDivElement>(null)

    const handleDivTouch = useCallback(
        (e: TouchEvent) => {
            e.stopPropagation()
        },
        [],
    )

    const handleDivWheel: React.WheelEventHandler<HTMLDivElement> = (e) => {
        e.stopPropagation()
    }

    const handleModalOverLayClick = () => {
        setOpen(false)
    }

    const handleContentClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
        e.stopPropagation()
    }

    const handleSubmitGuestBook: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()

        if (submitting) {
            return
        }

        if (presence === 0) {
            alert('Silakan mengonfirmasi kehadiran.')

            return
        }

        setSubmitting(true)

        const store = await storeRemark(fullname, message, presence)

        if (!store) {
            alert('Oops! Maaf, terjadi kesalahan. Silakan coba kembali.')

            setSubmitting(false)

            return
        }

        const remarks = await getRemarks()

        setRemarks(remarks)
        setFullname('')
        setMessage('')
        setPresence(0)
        setSubmitting(false)
        setOpen(false)

        messageDivRef.current?.scrollTo(0, 0)
    }

    useEffect(() => {
        const instance = mainDivRef.current

        instance!.addEventListener('touchstart', handleDivTouch, { passive: true })
        instance!.addEventListener('touchmove', handleDivTouch, { passive: true })

        return () => {
            instance!.removeEventListener('touchstart', handleDivTouch)
            instance!.removeEventListener('touchmove', handleDivTouch)
        }
    }, [handleDivTouch])

    return (
        <div className={`${open ? 'block' : 'hidden'} absolute top-0 left-0 w-full h-full bg-blue-floral bg-opacity-50 font-Inter`} onWheel={handleDivWheel} onClick={handleModalOverLayClick} ref={mainDivRef}>
            <div className='absolute w-full px-2 transform -translate-x-1/2 -translate-y-1/2 md:px-20 laptop:px-10 2xl:px-20 top-1/2 left-1/2'>
                <div className='w-full p-2 bg-white border-b rounded-t-md border-gold' onClick={handleContentClick}>
                    <h1 className='text-lg text-center'>Ucapan dan Doa</h1>
                </div>

                <div className='w-full p-4 pt-3 bg-white border-t border-gold rounded-b-md md:p-6 md:pt-3' onClick={handleContentClick}>
                    <form className='flex flex-col w-full text-blue-floral' onSubmit={handleSubmitGuestBook}>
                        <span className='text-[11px] md:text-xs text-blue-floral'>
                            Perhatian! Ucapan yang telah dikirim tidak dapat dihapus.
                        </span>

                        <input type='text'
                            value={fullname}
                            className='w-full px-2 py-1 mt-2 text-sm bg-gray-100 border rounded border-gold'
                            placeholder='Nama (beserta alamat singkat juga boleh 🤗)'
                            disabled={submitting}
                            required={true}
                            onChange={e => setFullname(e.target.value)}
                        />

                        <textarea value={message}
                            className='w-full px-2 py-1 mt-2 text-sm bg-gray-100 border rounded border-gold'
                            maxLength={200}
                            rows={5}
                            placeholder='Ucapan dan doa (maksimal 200 huruf ya 😉)'
                            disabled={submitting}
                            required={true}
                            onChange={e => setMessage(e.target.value)}
                        />

                        <select className='w-full px-2 py-1 mt-2 text-sm bg-gray-100 border rounded border-gold'
                            value={presence}
                            disabled={submitting}
                            required={true}
                            onChange={(e) => setPresence(parseInt(e.target.value))}
                        >
                            <option value={0} disabled={true} >Konfirmasi Kehadiran</option>
                            <option value={1}>Akan Hadir</option>
                            <option value={2}>Tidak Hadir</option>
                            <option value={3}>Telah Hadir</option>
                        </select>

                        <div className='flex flex-row flex-wrap items-center w-full mt-2'>
                            <button type='submit' className='w-full px-3 py-1 text-sm rounded-2xl bg-gold text-blue-floral hover:bg-gold2'>
                                {submitting ? 'Mengirim...' : 'Kirim'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Remark
