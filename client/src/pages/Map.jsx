import {APIProvider, Map} from '@vis.gl/react-google-maps';
import { PoiMarkers } from '../components/Pin.jsx';
import { MyContainer } from '../components/MyContainer.jsx';

export default function LocationMap() {

    const POIs = [
        {id: 1, name: 'Sha Tin Town Hall (Auditorium)', location: { lat: 22.38136, lng: 114.1899  }},
        {id: 2, name: 'Hong Kong Film Archive (Cinema)', location: { lat: 22.285056, lng: 114.222075  }},
        {id: 3, name: 'Kwai Tsing Theatre (Black Box Theatre)', location: { lat: 22.35665, lng: 114.12623 }},
      ];

    return (
        <MyContainer>
            <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY} onLoad={() => console.log('Maps API has loaded.')}>
                <div style={{height:"65vh", width:"70vw"}}>
                    <Map
                        defaultZoom={11.5}
                        defaultCenter={ { lat: 22.356514, lng: 114.136253 } }
                        mapId={import.meta.env.VITE_ALL_LOCATIONS_MAP_ID}
                        onCameraChanged={ (ev) =>
                            console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)
                        }>
                            <PoiMarkers pois={POIs} />
                    </Map>
                </div>
            </APIProvider>
        </MyContainer>
    )
}