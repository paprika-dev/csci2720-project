import axios from '../api/axios';
import { APIProvider, Map } from '@vis.gl/react-google-maps';
import { PoiMarkers } from '../components/Pin.jsx';
import { MyContainer } from '../components/MyContainer.jsx';
import { useState, useEffect } from 'react';

export default function LocationMap() {
    const [POIs, setPOIs] = useState([])

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
                    </Map>
                </div>
            </APIProvider>
        </MyContainer>
    )
}