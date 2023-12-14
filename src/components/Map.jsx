import React, { useEffect } from "react";
import styles from "./Map.module.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvent,
} from "react-leaflet";
import { useCities } from "../context/CitiesContext";
import { useNavigate } from "react-router-dom";
import { useGeolocation } from "../Hooks/useGelocation";
import Button from "./Button";
import { useUrlPosition } from "../Hooks/useUrlPosition";

function Map() {
  const [mapPosition, setMapPosition] = React.useState([40, 0]);

  const { cities } = useCities();
  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation();
  const [mapLat, mapLng] = useUrlPosition();
  // const [searchParams, setSearchParams] = useSearchParams();

  // function changePositionHandler() {
  //   setSearchParams({ lat: 23, lng: 50 });
  // }
  // function displayHandler() {
  //   navigate("form");
  // }

  useEffect(() => {
    if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
  }, [mapLat, mapLng]);

  useEffect(() => {
    if (geolocationPosition)
      setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
  }, [geolocationPosition]);

  return (
    <div className={styles.mapContainer}>
      {!geolocationPosition ? (
        <Button type="position" onClick={getPosition}>
          {isLoadingPosition ? "loading..." : "Use your Location "}
        </Button>
      ) : (
        ""
      )}
      <MapContainer
        center={mapPosition}
        // center={[mapLat, mapLng]}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />

        {cities.map((city) => (
          <Marker
            key={city.id}
            position={[city.position.lat, city.position.lng]}
          >
            <Popup>{city.cityName}</Popup>
          </Marker>
        ))}

        <ChangeMap position={mapPosition} />
        <DetectClick />
      </MapContainer>
      )
    </div>
  );
}

function ChangeMap({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvent({
    click: (e) => {
      navigate(`form?&lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
  return null;
}

export default Map;
