import React from 'react'
import { Wrapper, Status } from "@googlemaps/react-wrapper"
import MapComponent from '../MapComponent'
import MapMarker from '../MapMarker'

const Map = () => {
    const [zoom, setZoom] = React.useState(15) // initial zoom
    const [center, setCenter] = React.useState<google.maps.LatLngLiteral>({
        lat: -7.903019,
        lng: 112.619763,
    })

    const onIdle = (m: google.maps.Map) => {
        console.log("onIdle")
        setZoom(m.getZoom()!)
        setCenter(m.getCenter()!.toJSON())
    }

    const render = (status: Status) => {
        return <h1>{status}</h1>
    }

    return (
        <div className="relative flex flex-col items-center justify-center w-full h-full px-4 py-20 md:py-32 text-gold">
            <h2 className='text-5xl text-center md:text-7xl font-Creattion'>Lokasi</h2>

            <div className='w-full h-full mt-10'>
                <iframe className='w-full h-full'
                    loading="lazy"
                    allowFullScreen={true}
                    referrerPolicy="no-referrer-when-downgrade"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d987.9809974134121!2d112.61921248814639!3d-7.903009899642417!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e788140d1bd14f9%3A0x34737db22dff2a1b!2sMaaa!5e0!3m2!1sen!2sid!4v1658136822637!5m2!1sen!2sid">
                </iframe>
            </div>
        </div >
    )
}

export default Map
