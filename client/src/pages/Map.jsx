import {APIProvider, Map} from '@vis.gl/react-google-maps';
import { PoiMarkers } from '../components/Pin';

export const LocationMap = () => {

    const POIs = [
        {id: 1, name: 'Sha Tin Town Hall (Auditorium)', location: { lat: 22.38136, lng: 114.1899  }},
        {id: 2, name: 'Hong Kong Film Archive (Cinema)', location: { lat: 22.285056, lng: 114.222075  }},
        {id: 3, name: 'Kwai Tsing Theatre (Black Box Theatre)', location: { lat: 22.35665, lng: 114.12623 }},
        // {key: 'manlyBeach', location: { lat: -33.8209738, lng: 151.2563253 }},
        // {key: 'hyderPark', location: { lat: -33.8690081, lng: 151.2052393 }},
        // {key: 'theRocks', location: { lat: -33.8587568, lng: 151.2058246 }},
        // {key: 'circularQuay', location: { lat: -33.858761, lng: 151.2055688 }},
        // {key: 'harbourBridge', location: { lat: -33.852228, lng: 151.2038374 }},
        // {key: 'kingsCross', location: { lat: -33.8737375, lng: 151.222569 }},
        // {key: 'botanicGardens', location: { lat: -33.864167, lng: 151.216387 }},
        // {key: 'museumOfSydney', location: { lat: -33.8636005, lng: 151.2092542 }},
        // {key: 'maritimeMuseum', location: { lat: -33.869395, lng: 151.198648 }},
        // {key: 'kingStreetWharf', location: { lat: -33.8665445, lng: 151.1989808 }},
        // {key: 'aquarium', location: { lat: -33.869627, lng: 151.202146 }},
        // {key: 'darlingHarbour', location: { lat: -33.87488, lng: 151.1987113 }},
        // {key: 'barangaroo', location: { lat: - 33.8605523, lng: 151.1972205 }},
      ];

    return (
        <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY} onLoad={() => console.log('Maps API has loaded.')}>
            <div style={{height:"80vh", width:"80vw"}}>
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
    )
}