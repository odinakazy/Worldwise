import React from "react";
import styles from "./Map.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";
function Map() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  function changePositionHandler() {
    setSearchParams({ lat: 23, lng: 50 });
  }
  function displayHandler() {
    navigate("form");
  }
  return (
    <div className={styles.mapContainer} onClick={displayHandler}>
      <h1>Map reading from url </h1>
      <h4>{lat}</h4>
      <h4>{lng}</h4>
      <button onClick={changePositionHandler}>change position</button>
    </div>
  );
}

export default Map;
