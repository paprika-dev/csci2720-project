import { AdvancedMarker, Pin, useMap } from '@vis.gl/react-google-maps';
import { useCallback } from 'react';

export const PoiMarkers = ({ pois }) => {
    const map = useMap();

    const handleClick = useCallback((ev) => {
        if(!map) return;
        if(!ev.latLng) return;
        console.log('marker clicked:', ev.latLng.toString());
        map.panTo(ev.latLng);
      });

    return (
      <>
        {pois.map( (poi) => (
          <AdvancedMarker
            key={poi.key}
            position={poi.location}
            clickable={true}
            onClick={handleClick}>
          <Pin background={'#2ca9bc'} glyphColor={'#fff'} borderColor={'#fff'} />
          </AdvancedMarker>
        ))}
      </>
    );
  };