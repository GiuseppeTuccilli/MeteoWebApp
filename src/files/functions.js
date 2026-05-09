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
      throw new Error(" errore nella response");
    }
    const data = await res.json();

    return data;
  } catch (er) {
    throw new Error("errore recupero coordinate " + er);
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
      throw new Error("errore del server");
    }
    const data = await res.json();

    return data;
  } catch (er) {
    throw new Error("errore: " + er);
  }
};

export const getForecast = async function (cor) {
  const endpoint =
    "https://api.openweathermap.org/data/2.5/forecast?lat=" +
    cor.lat +
    "&lon=" +
    cor.lon +
    "&appid=" +
    key +
    "&units=metric&lang=it";

  try {
    const res = await fetch(endpoint);
    if (!res.ok) {
      throw new Error("errore del server");
    }
    const data = await res.json();

    return data;
  } catch (er) {
    throw new Error("errore: " + er);
  }
};

export const stringToDate = function (s) {
  const data = new Date();
  let s1 = "";
  if (s.length > 10) {
    s1 = s.slice(0, 10);
  } else {
    s1 = s;
  }

  const dateArray = [];

  const sDate = s1.split("-");
  for (let i = 0; i < sDate.length; i++) {
    dateArray.push(parseInt(sDate[i]));
  }

  data.setFullYear(dateArray[0], dateArray[1] - 1, dateArray[2]);

  return data;
};
