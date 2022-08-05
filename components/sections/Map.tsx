import React from 'react'

const Map = () => {
    return (
        <div className="relative flex flex-col items-center justify-start w-full h-full py-6 md:py-20 text-gold">
            <div className='w-full'>
                <h1 className='text-2xl text-center md:text-4xl font-HinaMincho'>LOKASI</h1>
            </div>

            <div className='w-full px-4 mt-10 md:px-20 md:mt-28'>
                <span className='text-sm text-left md:text-base font-Inter'>
                    Jl. Pulau Mas III, Kepuh Selatan, Kepuharjo, Kec. Karang Ploso, Kabupaten Malang, Jawa Timur 65152
                </span>
            </div>

            <div className='w-full h-full px-4 mt-2 md:px-20'>
                <iframe className='w-full h-full'
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen={false}
                    src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCMbdBjsKGNemBx88h8AHWfJV35pTAJvQM&q=3JW9+QWR, Jl. Pulau Mas III, Kepuh Selatan, Kepuharjo, Kec. Karang Ploso, Kabupaten Malang, Jawa Timur 65152&zoom=15&language=id">
                </iframe>
            </div>
        </div>
    )
}

export default Map
