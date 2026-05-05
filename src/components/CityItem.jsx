import { useEffect, useState } from "react";

const CityItem = function (props) {
  const [cityWheater, setCityWheater] = useState(null);
  const [coordinates, setCoordinates] = useState({});

  const city = props.city;

  const key = "907082adf259a39f128ff2e434487c57&units=metric";

  const getCoordinates = async function () {
    const endpoint =
      "http://api.openweathermap.org/geo/1.0/direct?limit=5&q=" +
      city +
      "&appid=" +
      key;

    let lat = null;
    let lon = null;

    try {
      const res = await fetch(endpoint);
      if (!res.ok) {
        throw new Error("errore nella response");
      }
      const data = await res.json();
      console.log(data);
      lat = data.filter((c) => {
        return c.country === "IT";
      })[0].lat;

      lon = data.filter((c) => {
        return c.country === "IT";
      })[0].lon;

      const obj = {
        lon: lon,
        lat: lat,
      };
      return obj;
    } catch (er) {
      return "errore recupero coordinate";
    }
  };

  const getWheater = async function () {
    try {
      const cord = await getCoordinates();
      console.log(cord);
    } catch (er) {
      console.log(er);
    }
  };

  useEffect(() => {
    getWheater();
  }, []);

  return <></>;
};

export default CityItem;
