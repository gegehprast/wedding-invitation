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
        <div className="relative flex flex-col items-center justify-center w-full h-full p-20 md:py-32 text-gold">
            <h2 className='text-5xl text-center md:text-7xl font-Creattion'>Lokasi</h2>

            <div className='w-full h-full mt-10'>
                <Wrapper apiKey={"AIzaSyCMbdBjsKGNemBx88h8AHWfJV35pTAJvQM"} render={render}>
                    <MapComponent center={center}
                        onIdle={onIdle}
                        zoom={zoom}
                        style={{ flexGrow: "1", height: "100%" }}
                    >
                        <MapMarker position={{ lat: -7.903019, lng: 112.619763 }} />
                    </MapComponent>
                </Wrapper>
            </div>
        </div >
    )
}

export default Map
