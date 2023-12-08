import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./City.module.css";
import { useCities } from "../context/CitiesContext";
import Spinner from "./Spinner";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

// TEMP DATA

function City() {
  const { currentCity, getCity, isLoading } = useCities();
  const navigate = useNavigate();
  // const currentCity = {
  //     cityName: "Lisbon",
  //     emoji: "🇵🇹",
  //     date: "2027-10-31T15:59:59.138Z",
  //     notes: "My favorite city so far!",
  //   };

  const { cityName, date, notes } = currentCity;

  const { id } = useParams();
  useEffect(() => {
    getCity(id);
  }, [id]);

  if (isLoading) return <Spinner />;

  function MoveBackHnadler(e) {
    e.preventDefault();
    navigate(-1);
  }
  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>{cityName}</h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <Button onClick={MoveBackHnadler} type="back">
          &larr; Back
        </Button>
      </div>
    </div>
  );
}

export default City;
