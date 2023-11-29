import React from "react";
import styles from "./CityItem.module.css";
import { Link } from "react-router-dom";
function CityItem({ city }) {
  const { cityName, date, id, position } = city;
  console.log(position);

  return (
    <li>
      <Link
        className={styles.cityItem}
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
