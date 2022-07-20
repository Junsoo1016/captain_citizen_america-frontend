import React, {useState, useCallback, useEffect} from 'react'
import { GoogleMap, useJsApiLoader, MarkerF, InfoWindow, DirectionsRenderer } from '@react-google-maps/api';
import "./map.css"
import mapStyles from './mapStyles'


const containerStyle = {
  width: '100%',
  height: '100%',
  margin: '0 auto',
}

const center = {
  lat: 40.74112,
  lng: -73.98974
}

const google = window.google

function Map({userData}) {
  const API_KEY = process.env.REACT_APP_API_KEY
  console.log(API_KEY);
  // console.log(props);
  const isLoaded = useJsApiLoader({
    id: 'google-map-script',
    version: "weekly",
    googleMapsApiKey: API_KEY,
    libraries: ['places'],
  })

  const [clicked, setClicked] = useState(false)
  const [selectedPlace, setSelectedPlace] = useState(null)
  const [distance, setDistance] = useState(null)
  const [duration, setDuration] = useState(null)
  const [directions, setDirections] = useState(null)
  const [map, setMap] = useState(null)
  const [currentLocation, setCurrentLocation] = useState({
    lat: 40.74112,
    lng: -73.98974
  })
  const [destination, setDestination] = useState({
    lat: null,
    lng: null
  })

  const calculateRoute = (e) => {
    e.preventDefault()
    setClicked(!clicked)
    const polylineOptionsActual = new google.maps.Polyline({
      strokeColor: 'rgb(255, 85, 0)',
      strokeOpacity: 1.0,
      strokeWeight: 5
      });
    const origin = new google.maps.LatLng(currentLocation.lat, currentLocation.lng)
    const userDestination = new google.maps.LatLng(destination.lat, destination.lng)
    const directionsService = new google.maps.DirectionsService();
    const directionsDisplay = new google.maps.DirectionsRenderer({
      suppressMarkers: true,
      polylineOptions: polylineOptionsActual
    });
    directionsDisplay.setMap(map);
    directionsService.route({
      origin: origin,
      destination: userDestination,
      travelMode: 'WALKING'
    }, (result, status) => {
      if (status === 'OK') {
        setDirections(result)
        directionsDisplay.setDirections(result);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }

  const clearDirectionService = () => {
    console.log("clearing directions");
    const directionsDisplay = new google.maps.DirectionsRenderer()
    if (directionsDisplay != null) {
      directionsDisplay.setMap(null);
      directionsDisplay = null;
    }
  }
    // window.location.reload()



  
  const image = "./images/Captain_America's_Shield.png"
  const userMarker = "./images/user.png"

  const [selectedMarker, setSelectedMarker] = useState()

  // console.log(selectedMarker);
  console.log(destination);

  return isLoaded ? (
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

        <MarkerF
          position={currentLocation}
          icon={{
            url: userMarker,
            scaledSize: new window.google.maps.Size(25, 35)
          }}
          onClick={() => {
            setSelectedMarker(currentLocation)
            setSelectedPlace(currentLocation)
          }
          }
        />

      {userData.map((user) => {
    let lat = parseFloat(user.lat);
    let lng = parseFloat(user.lng);

    return (
      <MarkerF
      key={user.id}
      position= {{lat: lat, lng: lng}} 
      icon={{
        url: image,
        scaledSize: new window.google.maps.Size(28,28)
      }}
      onClick={() => {
        setClicked(false)
        setSelectedMarker(user)
        setDestination({
          ...destination,
          lat: parseFloat(user.lat), 
          lng: parseFloat(user.lng)
        })
        console.log(user)
      }}
      />
    )
  })
}


      {selectedMarker && 
      (<InfoWindow
      position= {{lat: parseFloat(selectedMarker.lat), lng: parseFloat(selectedMarker.lng)}}
      onCloseClick={() => {
        setSelectedMarker(null)
      }}
      >
      <div id='infoWindow'>
        User Details
        <p>Name: {selectedMarker.first_name} {selectedMarker.last_name}</p>
        {!clicked ?
        <button onClick={calculateRoute}>Navigate</button> : <button onClick={clearDirectionService}>Clear Route</button>
        }
      </div>
      </InfoWindow>
      )}

    </GoogleMap>
     

    
    
  ) : <h1>Loading</h1>
}
export default React.memo(Map)