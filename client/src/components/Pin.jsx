import { AdvancedMarker, Pin, InfoWindow, useAdvancedMarkerRef } from '@vis.gl/react-google-maps';
import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import homeSVG from '../assets/home.svg'

const MarkerWithInfoWindow = ({ position, name, useHomePin=false }) => {
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [infoWindowShown, setInfoWindowShown] = useState(false);

  const handleMarkerClick = useCallback(() => setInfoWindowShown(isShown => !isShown), []);
  const handleClose = useCallback(() => setInfoWindowShown(false), []);

  const locURL = "/locations/" + name.replace(/\s+/g,'-')

  return (
    <>
      <AdvancedMarker
        ref={markerRef}
        position={position}
        onClick={handleMarkerClick}>
        <Pin background={'#2ca9bc'} glyphColor={'#fff'} borderColor={'#fff'} />
      </AdvancedMarker>
      {infoWindowShown && (
        <InfoWindow anchor={marker} onClose={handleClose}>
          <Link to={locURL}>{name}</Link>
        </InfoWindow>
      )}
    </>
  );
};

export const PoiMarkers = ({ pois }) => {
    return (
      <>
        {pois.map( (poi) => (
          <MarkerWithInfoWindow
            key={poi.id}
            position={{"lat":poi.latitude, "lng": poi.longitude}}
            name={poi.name} 
          />
        ))}      
      </>
    );
  };

export const UserLocationMarker = ({ position }) => {
  return(
    <>
      <AdvancedMarker
        position={position}>
        <img src={homeSVG} />
      </AdvancedMarker>
    </>
  )
}