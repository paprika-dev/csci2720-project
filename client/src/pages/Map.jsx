import { APIProvider, Map } from '@vis.gl/react-google-maps';
import { PoiMarkers } from '../components/Pin.jsx';
import { MyContainer } from '../components/MyContainer.jsx';
import { useState, useEffect } from 'react';

export default function LocationMap() {
    
    const [POIs, setPOIs] = useState([])

    // get request to fetch location data
    const locDataURL = "http://127.0.0.1:5000/front_end_testing_all_locations" // to be changed
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
                        defaultZoom={11.5}
                        defaultCenter={ { lat: 22.356514, lng: 114.136253 } }
                        mapId={import.meta.env.VITE_ALL_LOCATIONS_MAP_ID}
                    >
                            <PoiMarkers pois={POIs} />
                    </Map>
                </div>
            </APIProvider>
        </MyContainer>
    )
}