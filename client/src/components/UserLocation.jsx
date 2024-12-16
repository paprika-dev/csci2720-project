import React, { useState, useEffect, useRef } from "react";
import { APIProvider, useMapsLibrary } from "@vis.gl/react-google-maps";
import { getGeocode, getLatLng } from "use-places-autocomplete";
import Form from 'react-bootstrap/Form';

export const UserLocation = ({ setUserInfo }) => {
  const [selectedPlace, setSelectedPlace] = useState(null);

  const storeUserLocation = async () => {
    if (selectedPlace) {
      const result = await getGeocode({ address: selectedPlace.formatted_address })
      const { lat, lng } = getLatLng(result[0]);
      const userinfo = JSON.parse(localStorage.getItem('user'))
      userinfo.location = {
          name: selectedPlace.name, 
          latitude: lat, 
          longitude: lng 
      }
      localStorage.setItem("user", JSON.stringify(userinfo))
      setUserInfo(userinfo)
    }
  }

  useEffect(()=>{
    storeUserLocation()
  },[selectedPlace])

  return (
    <APIProvider
      apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
      language="en"
      solutionChannel="GMP_devsite_samples_v3_rgmautocomplete"
    >
      <PlaceAutocomplete onPlaceSelect={setSelectedPlace} />
    </APIProvider>
  );
};


const PlaceAutocomplete = ({ onPlaceSelect }) => {
  const [placeAutocomplete, setPlaceAutocomplete] = useState(null);
  const inputRef = useRef(null);
  const places = useMapsLibrary("places");

  useEffect(() => {
    if (!places || !inputRef.current) return;

    const options = {
      fields: ["name", "formatted_address"],
      componentRestrictions: { country: "hk" }, // restrict search results to Hong Kong
    };

    setPlaceAutocomplete(new places.Autocomplete(inputRef.current, options));
  }, [places]);

  useEffect(() => {
    if (!placeAutocomplete) return;

    placeAutocomplete.addListener("place_changed", () => {
      onPlaceSelect(placeAutocomplete.getPlace());
    });
  }, [onPlaceSelect, placeAutocomplete]);

  return (
    <div className="autocomplete-container">
      <Form.Control placeholder="Enter your loction" ref={inputRef}/>
    </div>
  );
};
