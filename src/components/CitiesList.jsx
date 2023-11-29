import React from "react";
import styles from "./CitiesList.module.css";
import Spinner from "./Spinner";
import CityItem from "./CityItem";
function CitiesList({ cities, isLoading }) {
  if (isLoading) return <Spinner />;
  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}

export default CitiesList;
