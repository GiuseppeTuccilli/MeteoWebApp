import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getForecast, stringToDate } from "../files/functions";
import Nav from "react-bootstrap/Nav";

const Forecast = function () {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [forecast, setForecast] = useState(null);
  const [forecastArray, setForecastArray] = useState([]);
  const [active, setActive] = useState("0");

  const cor = {
    lat: params.lat,
    lon: params.lon,
  };

  const today = new Date();

  const secondDay = new Date();
  secondDay.setDate(secondDay.getDate() + 1);
  const thirdDay = new Date();
  thirdDay.setDate(secondDay.getDate() + 1);
  const fourthDay = new Date();
  fourthDay.setDate(thirdDay.getDate() + 1);
  const fifthDay = new Date();
  fifthDay.setDate(fourthDay.getDate() + 1);

  const handleForecastArray = function (day, array) {
    const ar = array.filter((el) => {
      const dataEl = el.dt_txt;
      const data = dataEl.slice(0, 10);
      return data === day.toISOString().slice(0, 10);
    });
    setForecastArray(ar);
  };

  const initPage = async function () {
    try {
      const data = await getForecast(cor);
      setForecast(data);
      handleForecastArray(today, data.list);
      setLoading(false);
    } catch (er) {
      console.log(er);
      setLoading(false);
    }
  };

  useEffect(() => {
    initPage();
  }, []);

  return (
    <>
      <div className="d-flex  text-white align-items-center  ">
        <div className="p-2 border border-1 border-secondary-subtle bg-secondary h4rem d-flex align-items-center flex-grow-1 justify-content-center">
          <h2 className="m-0">
            Città:{" "}
            <span className="text-decoration-underline text-info">
              {forecast.city.name}
            </span>
          </h2>
        </div>
        <div className="p-2 border-border-1 border-secondary bg-primary-subtle text-dark h4rem d-flex align-items-center">
          <h3 className="m-0">
            Paese:{" "}
            <span className="text-decoration-underline">
              {forecast.city.country}
            </span>
          </h3>
        </div>
      </div>
      <Nav
        justify
        variant="tabs"
        defaultActiveKey="0"
        className="d-none d-md-flex"
      >
        <Nav.Item>
          <Nav.Link
            eventKey="0"
            onClick={() => {
              setActive("0");
            }}
            className="fw-bold"
          >
            Oggi
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="1"
            onClick={() => {
              setActive("1");
            }}
            className="fw-bold"
          >
            {secondDay.toString().slice(4, 10)}
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="2"
            onClick={() => {
              setActive("2");
            }}
            className="fw-bold"
          >
            {thirdDay.toString().slice(4, 10)}
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="3"
            onClick={() => {
              setActive("3");
            }}
            className="fw-bold"
          >
            {fourthDay.toString().slice(4, 10)}
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="4"
            onClick={() => {
              setActive("4");
            }}
            className="fw-bold"
          >
            {fifthDay.toString().slice(4, 10)}
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </>
  );
};

export default Forecast;
