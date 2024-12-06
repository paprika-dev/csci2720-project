import {APIProvider, Map} from '@vis.gl/react-google-maps';

export const LocationMap = () => {
    return (
        <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY} onLoad={() => console.log('Maps API has loaded.')}>
            <div style={{height:"80vh", width:"80vw"}}>
                <Map
                    defaultZoom={13}
                    defaultCenter={ { lat: -33.860664, lng: 151.208138 } }
                    onCameraChanged={ (ev) =>
                        console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)
                    }>
                </Map>
            </div>
        </APIProvider>
    )
}