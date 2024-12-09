import { AdvancedMarker, Pin, InfoWindow, useAdvancedMarkerRef } from '@vis.gl/react-google-maps';
import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';

const MarkerWithInfoWindow = ({position, locId, locName}) => {
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [infoWindowShown, setInfoWindowShown] = useState(false);

  const handleMarkerClick = useCallback(() => setInfoWindowShown(isShown => !isShown), []);
  const handleClose = useCallback(() => setInfoWindowShown(false), []);

  const locURL = "/locations/" + locId 

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
          <Link to={locURL}>{locName}</Link>
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
            position={poi.location}
            locName={poi.name}
            locId={poi.id}>
          </MarkerWithInfoWindow>
        ))}      
      </>
    );
  };