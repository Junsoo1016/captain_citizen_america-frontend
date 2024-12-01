import React, { useState } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  MarkerF,
  InfoWindow,
  DirectionsRenderer,
} from "@react-google-maps/api";
import "./map.css";
import mapStyles from "./mapStyles";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 40.74112,
  lng: -73.98974,
};

function Map({ userData }) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_API_KEY,
    libraries: ["places"],
  });

  const [map, setMap] = useState(null);
  const [currentLocation] = useState(center);
  const [destination, setDestination] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [directions, setDirections] = useState(null);

  const userMarkerIcon = "/images/user.png";
  const shieldIcon = "/images/captain_shield.png";

  const calculateRoute = async () => {
    if (!destination || !map) return;

    const { google } = window;
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer({
      suppressMarkers: true,
      polylineOptions: {
        strokeColor: "rgb(255, 85, 0)",
        strokeOpacity: 1.0,
        strokeWeight: 5,
      },
    });

    directionsRenderer.setMap(map);

    try {
      const result = await directionsService.route({
        origin: currentLocation,
        destination,
        travelMode: "WALKING",
      });
      setDirections(result);
      directionsRenderer.setDirections(result);
    } catch (error) {
      alert("Error calculating route: " + error.message);
    }
  };

  const clearRoute = () => {
    setDirections(null);
  };

  if (!isLoaded) {
    return <h1>Loading...</h1>;
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={16}
      options={{
        styles: mapStyles,
        disableDefaultUI: true,
      }}
      onLoad={(map) => setMap(map)}
    >
      {/* Current Location Marker */}
      <MarkerF
        position={currentLocation}
        icon={{
          url: userMarkerIcon,
          scaledSize: new window.google.maps.Size(25, 35),
        }}
        onClick={() => setSelectedMarker(currentLocation)}
      />

      {/* User Markers */}
      {userData.map((user) => (
        <MarkerF
          key={user.id}
          position={{
            lat: parseFloat(user.lat),
            lng: parseFloat(user.lng),
          }}
          icon={{
            url: shieldIcon,
            scaledSize: new window.google.maps.Size(28, 28),
          }}
          onClick={() => {
            setSelectedMarker(user);
            setDestination({
              lat: parseFloat(user.lat),
              lng: parseFloat(user.lng),
            });
          }}
        />
      ))}

      {/* InfoWindow */}
      {selectedMarker && (
        <InfoWindow
          position={{
            lat: parseFloat(selectedMarker.lat),
            lng: parseFloat(selectedMarker.lng),
          }}
          onCloseClick={() => setSelectedMarker(null)}
        >
          <div id="infoWindow">
            <p>
              Name: {selectedMarker.first_name} {selectedMarker.last_name}
            </p>
            {!directions ? (
              <button onClick={calculateRoute}>Navigate</button>
            ) : (
              <button onClick={clearRoute}>Clear Route</button>
            )}
          </div>
        </InfoWindow>
      )}

      {/* Directions Renderer */}
      {directions && <DirectionsRenderer directions={directions} />}
    </GoogleMap>
  );
}

export default React.memo(Map);
