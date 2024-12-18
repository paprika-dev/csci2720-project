// Group 20
// LIN Yu Hsiang           1155172258
// CHAN Yiu Cheung         1155193060
// CHENG Hing Wai Kristian 1155176902
// CHENG Kwan Wai          1155157943

import axios from '../api/axios';
import { APIProvider, Map } from '@vis.gl/react-google-maps';
import { PoiMarkers } from '../components/Pin.jsx';
import { UserLocationMarker } from '../components/Pin.jsx';
import { MyContainer } from '../components/MyContainer.jsx';
import { useState, useEffect } from 'react';

export default function LocationMap() {
    const [POIs, setPOIs] = useState([])
    const userLocation = JSON.parse(localStorage.getItem('user')).location

    const fetchLocationData = async () => {
        try {
            const response = await axios.get('/locations/');
            setPOIs(response.data);
        } catch (error) {
            console.error('There was an error fetching the location data!', error);
        }
    };

    useEffect(() => {
        fetchLocationData();
    }, []);

    return (
        <MyContainer>
            <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY} language="en">
                <div style={{height:"65vh", width:"70vw"}}>
                    <Map
                        defaultZoom={11.1}
                        defaultCenter={ { lat: 22.402769627852184, lng: 114.12232266491166 } }
                        mapId={import.meta.env.VITE_ALL_LOCATIONS_MAP_ID}
                    >
                            <PoiMarkers pois={POIs} />
                            <UserLocationMarker position={{"lat": userLocation.latitude, "lng": userLocation.longitude}}/>
                    </Map>
                </div>
            </APIProvider>
        </MyContainer>
    )
}