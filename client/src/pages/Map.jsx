import { APIProvider, Map } from '@vis.gl/react-google-maps';
import { PoiMarkers } from '../components/Pin.jsx';
import { MyContainer } from '../components/MyContainer.jsx';
import { useState, useEffect } from 'react';

export default function LocationMap() {
    
    const [POIs, setPOIs] = useState([])

    // get request to fetch location data
    const locDataURL = import.meta.env.VITE_REACT_APP_BACKEND_URL + "/locations"
    useEffect(() => {
        fetch(locDataURL)
        .then(res=>res.json())
        .then(d=>{setPOIs(d)})
    }, [])

    return (
        <MyContainer>
            <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
                <div style={{height:"65vh", width:"70vw"}}>
                    <Map
                        defaultZoom={11.1}
                        defaultCenter={ { lat: 22.402769627852184, lng: 114.12232266491166 } }
                        mapId={import.meta.env.VITE_ALL_LOCATIONS_MAP_ID}
                        onCameraChanged={ (ev) =>
                            console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)
                          }
                    >
                            <PoiMarkers pois={POIs} />
                    </Map>
                </div>
            </APIProvider>
        </MyContainer>
    )
}