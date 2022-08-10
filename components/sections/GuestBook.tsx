import React, { useCallback, useEffect, useRef, useState } from 'react'
import HttpException from '../../exceptions/HttpException'

interface RemarkDoc {
    _id: string
    fullname: string
    message: string
    presence: number
    createdAt: Date
    updatedAt: Date
    presenceText: string
}

const getRemarks = async () => {
    return await fetch(process.env.NEXT_PUBLIC_FUNCTION_HOST + '/api/remarks').then(res => res.json())
}

const storeRemark = async (fullname: string, message: string, presence: number) => {
    try {
        const resp = await fetch(`${process.env.NEXT_PUBLIC_FUNCTION_HOST}/api/store-remark`, {
            method: 'POST',
            body: JSON.stringify({ fullname, message, presence }),
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }),
        })
        const jsonResp = await resp.clone().json()

        if (!resp.ok) {
            throw new HttpException(resp.status, jsonResp.message || resp.statusText, jsonResp.stack)
        }

        return true
    } catch (error) {
        return false
    }
}

const GuestBook = () => {
    const [fullname, setFullname] = useState('')
    const [message, setMessage] = useState('')
    const [presence, setPresence] = useState(0)
    const [remarks, setRemarks] = useState<RemarkDoc[]>([])
    const messageDivRef = useRef<HTMLDivElement>(null)

    const handleMessageWheel: React.WheelEventHandler<HTMLDivElement> = (e) => {
        e.stopPropagation()
    }

    const handleMessageTouch = useCallback(
        (e: TouchEvent) => {
            e.stopPropagation()
        },
        [],
    )

    const handleSubmitGuestBook: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()
        
        const store = await storeRemark(fullname, message, presence)

        if (!store) {
            alert('Oops! Maaf, terjadi kesalahan. Silakan coba kembali.')

            return
        }
        
        const remarks = await getRemarks()

        setRemarks(remarks)

        messageDivRef.current?.scrollTo(0, 0)
    }

    useEffect(() => {
        async function _getRemarks() {
            const remarks = await getRemarks()

            setRemarks(remarks)
        }

        _getRemarks()
    }, [])


    useEffect(() => {
        const instance = messageDivRef.current

        instance!.addEventListener('touchstart', handleMessageTouch, { passive: true })
        instance!.addEventListener('touchmove', handleMessageTouch, { passive: true })

        return () => {
            instance!.removeEventListener('touchstart', handleMessageTouch)
            instance!.removeEventListener('touchmove', handleMessageTouch)
        }
    }, [handleMessageTouch])

    return (
        <>
            <div className='w-full'>
                <h1 className='text-2xl text-center md:text-4xl laptop:text-3xl 2xl:text-4xl font-HinaMincho'>BUKU TAMU</h1>
            </div>

            <div className='w-full px-2 mt-8 md:px-20 laptop:px-10 2xl:px-20 md:mt-14 lg:mt-28 laptop:mt-6 2xl:mt-24 font-Inter'>
                <div className='max-h-[42vh] md:max-h-[45vh] laptop:max-h-[43vh] 2xl:max-h-[45vh] overflow-y-scroll p-2 md:p-4' onWheel={handleMessageWheel} ref={messageDivRef}>
                    {remarks.map((remark) => (<div key={remark._id} className='flex flex-row mb-3 md:mb-6 flex-nowrap'>
                        <div className='w-full'>
                            <div className='py-1 px-2 md:px-3 md:py-2 rounded-md shadow-[0_3px_15px_-7px] md:shadow-[0_3px_25px_-10px] bg-gold shadow-[color:rgba(206,240,251,1)]'>
                                <div className='flex flex-row items-center flex-nowrap'>
                                    <span className='text-sm font-bold text-blue-floral md:text-base'>
                                        {remark.fullname}
                                    </span>

                                    <span className='px-2 ml-2 text-xs text-white rounded-lg bg-blue-floral'>
                                        {remark.presenceText}
                                    </span>
                                </div>

                                <p className='text-xs leading-tight text-blue-floral md:leading-snug md:text-base'>
                                    {remark.message}
                                </p>
                            </div>
                        </div>
                    </div>))}
                </div>
            </div>

            <div className='w-full px-2 mt-2 md:px-20 laptop:px-10 2xl:px-20 font-Inter'>
                <form className='flex flex-col w-full pl-2 pr-4 ml-auto text-blue-floral md:pl-4 md:pr-6' onSubmit={handleSubmitGuestBook}>
                    <input type='text'
                        value={fullname}
                        className='w-full p-1 text-sm rounded'
                        placeholder='Nama lengkap (panggilan & lokasi asal juga boleh 🤗)'
                        required={true}
                        onChange={e => setFullname(e.target.value)}
                    />

                    <textarea value={message}
                        className='w-full p-1 mt-2 text-sm rounded'
                        maxLength={200}
                        rows={4}
                        placeholder='Tulis ucapan'
                        required={true}
                        onChange={e => setMessage(e.target.value)}
                    />

                    <select className='w-full p-1 mt-2 text-sm rounded'
                        value={presence}
                        required={true}
                        onChange={(e) => setPresence(parseInt(e.target.value))}
                    >
                        <option value={0} disabled={true} >Konfirmasi Kehadiran</option>
                        <option value={1}>Akan Hadir</option>
                        <option value={2}>Tidak Hadir</option>
                        <option value={3}>Telah Hadir</option>
                    </select>

                    <div className='w-full mt-2'>
                        <button type='submit' className='px-3 py-1 text-sm rounded-2xl bg-gold text-blue-floral hover:bg-gold2'>
                            Kirim
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default GuestBook
