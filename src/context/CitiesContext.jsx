import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const citiesContext = createContext();

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentCity, setCurrentCity] = useState({});
  const fetchCities = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("http://localhost:9000/cities");
      // const data = await response.json();
      console.log(response.data);
      setCities(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  const getCity = async (id) => {
    try {
      setIsLoading(true);
      const response = await axios.get(`http://localhost:9000/cities/${id}`);
      // const data = await response.json();
      console.log(response.data);
      setCurrentCity(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  const createCity = async (newCity) => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        `http://localhost:9000/cities/`,
        newCity
      );

      // const data = await response.json();
      console.log(response.data);
      setCities((cities) => [...cities, response.data]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  async function deleteCity(id) {
    try {
      const response = await axios.delete(`http://localhost:9000/cities/${id}`);

      // const data = await response.json();
    } catch (error) {
      console.error(error);
    }
    setCities((cities) => cities.filter((city) => city.id !== id));
  }

  useEffect(() => {
    fetchCities();
  }, []);

  return (
    <citiesContext.Provider
      value={{
        cities,
        isLoading,
        getCity,
        currentCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </citiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(citiesContext);
  return context;
}

export { CitiesProvider, useCities };
