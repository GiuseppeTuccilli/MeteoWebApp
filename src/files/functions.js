const key = import.meta.env.VITE_API_KEY;

export const getCoordinates = async function (city) {
  const endpoint =
    "http://api.openweathermap.org/geo/1.0/direct?limit=5&q=" +
    city +
    "&appid=" +
    key +
    "&units=metric";

  try {
    const res = await fetch(endpoint);
    if (!res.ok) {
      throw new Error("errore nella response");
    }
    const data = await res.json();
    console.log(data);
    return data;
  } catch (er) {
    const str = "errore recupero coordinate";
    return str;
  }
};

export const getWheater = async function (cor) {
  const endpoint =
    "https://api.openweathermap.org/data/2.5/weather?lat=" +
    cor.lat +
    "&lon=" +
    cor.lon +
    "&appid=" +
    key +
    "&units=metric&lang=it";

  try {
    const res = await fetch(endpoint);
    if (!res.ok) {
      throw new Error("errore nella response");
    }
    const data = await res.json();
    console.log(data);
    return data;
  } catch (er) {
    console.log("errore: " + er);
    return "errore";
  }
};
