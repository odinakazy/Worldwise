import React from "react";
import styles from "./CityItem.module.css";
import { Link } from "react-router-dom";
import { useCities } from "../context/CitiesContext";
function CityItem({ city }) {
  const { currentCity } = useCities();
  const { cityName, date, id, position } = city;
  console.log(position);

  return (
    <li>
      <Link
        className={`${styles.cityItem} ${
          id === currentCity.id ? styles["cityItem--active"] : ""
        }`}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{date}</time>
        <button className={styles.deleteBtn}>&times;</button>
      </Link>
      {/* <span className={styles.emoji}>{emoji}</span> */}
      {/* <h3 className={styles.name}>{cityName}</h3>
      <time className={styles.date}>{date}</time>
      <button className={styles.deleteBtn}>&times;</button> */}
    </li>
  );
}

export default CityItem;
