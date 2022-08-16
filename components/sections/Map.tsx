import React from 'react'

const Map = () => {
    return (
        <>
            <div className='w-full'>
                <h1 className='text-2xl text-center md:text-4xl laptop:text-3xl 2xl:text-4xl font-HinaMincho'>PETA</h1>
            </div>

            <div className='w-full px-4 mt-10 md:px-20 laptop:px-16 2xl:px-20 md:mt-14 lg:mt-28 laptop:mt-6 2xl:mt-24'>
                <span className='text-sm text-left md:text-base font-Inter'>
                    Jl. Pulau Mas III, Kepuharjo, Kec. Karang Ploso, Kab. Malang, Jawa Timur 65152
                </span>
            </div>

            <div className='w-full h-full px-4 pb-20 mt-2 md:pb-10 md:px-20 laptop:px-16 2xl:px-20'>
                <iframe className='w-full h-full border-4 md:border-[6px] rounded-md border-gold'
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen={false}
                    src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCMbdBjsKGNemBx88h8AHWfJV35pTAJvQM&q=3JW9+QWR, Jl. Pulau Mas III, Kepuh Selatan, Kepuharjo, Kec. Karang Ploso, Kabupaten Malang, Jawa Timur 65152&zoom=15&language=id">
                </iframe>
            </div>
        </>
    )
}

export default Map
