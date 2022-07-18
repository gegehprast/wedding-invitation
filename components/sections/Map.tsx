import React from 'react'

const Map = () => {
    return (
        <div className="relative flex flex-col items-center justify-center w-full h-full px-4 py-20 md:px-10 md:py-32 text-gold">
            <h2 className='text-5xl text-center md:text-7xl font-Creattion'>Lokasi</h2>

            <div className='w-full h-full mt-2'>
                <iframe className='w-full h-full'
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen={false}
                    src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCMbdBjsKGNemBx88h8AHWfJV35pTAJvQM&q=3JW9+QWR, Jl. Pulau Mas III, Kepuh Selatan, Kepuharjo, Kec. Karang Ploso, Kabupaten Malang, Jawa Timur 65152&zoom=15&language=id">
                </iframe>
            </div>
        </div >
    )
}

export default Map
