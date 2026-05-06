export const getCoordinates = async function (city) {
  const key = import.meta.env.VITE_API_KEY;

  const endpoint =
    "http://api.openweathermap.org/geo/1.0/direct?limit=5&q=" +
    city +
    "&appid=" +
    key +
    "&units=metric";

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
    const str = "errore recupero coordinate";
    return str;
  }
};
