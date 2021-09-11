import React, { useState, useEffect } from 'react';
import './location.css';

const Location = () => {

  const geo = navigator.geolocation;

  const [userLocation, setUserLocation] = useState([0, 0]);
  const [userLocationError, setUserLocationError] = useState("");

  const getLocation = () => {
    geo.getCurrentPosition(
      (position) => setUserLocation([position.coords.latitude, position.coords.longitude]),
      setError, { enableHighAccuracy: true });
  }

  const setError = (error) => {
    switch(error.code) {
      case error.PERMISSION_DENIED:
        setUserLocationError("Usuario negou a requisição para Geolocalização.");
        break;
      case error.POSITION_UNAVAILABLE:
        setUserLocationError("Localização adquirida é invalida");
        break;
      case error.TIMEOUT:
        setUserLocationError("Limete de tempo para aceitar a requisição excedido");
        break;
      case error.UNKNOWN_ERROR:
        setUserLocationError("Erro de  precisão desconhecido");
        break;
      default:
        setUserLocationError("");
        break;
    }
  }

  useEffect(() => {
    foo();
  }, [getLocation]);
  
  const foo = () => {
      const frameElement = document.getElementById("gmap_canvas")
      if (frameElement != null) {
        frameElement.src=`https://maps.google.com/maps?q=${userLocation[0]}%20${userLocation[1]}&T=&z=17&ie=UTF8&iwloc=&output=embed` ?? null;
    }
  }
  
  return (
    <div className="mapouter">
        { (userLocation[0] && userLocation[1]) ?
          <div className="gmap_canvas">
            <iframe width="600" height="500" id="gmap_canvas" frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0">
            </iframe>
          </div>
          :
          null
      }
        <button onClick={getLocation}>AAAAAAAAa It</button>
    </div>
  );
}

export default Location;