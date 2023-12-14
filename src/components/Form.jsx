import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import styles from "./Form.module.css";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { useUrlPosition } from "../Hooks/useUrlPosition";
import Spinner from "./Spinner";
import Message from "./Message";
import "react-datepicker/dist/react-datepicker.css";
import { useCities } from "../context/CitiesContext";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const [lat, lng] = useUrlPosition();
  const { createCity, isLoading } = useCities();
  const navigate = useNavigate();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  //   const [emoji, setEmoji] = useState("");
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const [error, setError] = useState("");
  function MoveBackHnadler(e) {
    e.preventDefault();
    navigate(-1);
  }

  useEffect(() => {
    const fetchCityData = async () => {
      if (!lat && !lng) return;
      try {
        setIsLoadingGeocoding(true);
        setError("");
        const response = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
        );
        const data = await response.json();
        if (!data.countryCode) {
          //   setIsError(true);
          throw new Error(
            "😊That doesnt seem to be a city ,click somewhere else 😊 "
          );
        }
        // if (data.countryCode) {
        //   setIsError(false);

        setCityName(data.city || data.locality || "");
        setCountry(data.countryName);
        // setEmoji(convertToEmoji(data.countryCode));
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoadingGeocoding(false);
      }
    };
    fetchCityData();
  }, [lat, lng]);
  if (isLoadingGeocoding) return <Spinner />;
  if (error) return <Message />;
  if (!lat && !lng) return <Message />;

  async function submitHandler(e) {
    e.preventDefault();

    if (!cityName || !date) return;

    const newCity = {
      cityName,
      country,
      date,
      notes,
      position: { lat, lng },
    };
    console.log(newCity);
    await createCity(newCity);
    setNotes("");
    navigate("/app/cities");
    // setCities((cities) => [...cities, newCity]);
  }

  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
      onSubmit={submitHandler}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        {/* <span className={styles.flag}>{emoji}</span> */}
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>

        <DatePicker
          id="date"
          onChange={(date) => setDate(date)}
          selected={date}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <Button onClick={MoveBackHnadler} type="back">
          &larr; Back
        </Button>
      </div>
    </form>
  );
}

export default Form;
