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

  useEffect(() => {
    fetchCities();
  }, []);

  return (
    <citiesContext.Provider value={{ cities, isLoading, getCity, currentCity }}>
      {children}
    </citiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(citiesContext);
  return context;
}

export { CitiesProvider, useCities };
