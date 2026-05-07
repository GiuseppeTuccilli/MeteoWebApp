import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getForecast, stringToDate } from "../files/functions";
import Nav from "react-bootstrap/Nav";
import { Spinner, Button, Alert } from "react-bootstrap";
import ForecastTab from "./ForecastTab";
import Carousel from "react-bootstrap/Carousel";

const Forecast = function () {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [forecast, setForecast] = useState(null);
  const [forecastArray, setForecastArray] = useState([]);
  const [active, setActive] = useState("0");
  const [firstRender, setFirstRender] = useState(true);
  const [index, setIndex] = useState(0);

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

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
    setActive(selectedIndex.toString());
  };

  const initPage = async function () {
    try {
      const data = await getForecast(cor);
      setForecast(data);
      const dayToShow = new Date();
      dayToShow.setDate(today.getDate() + parseInt(active));
      handleForecastArray(dayToShow, data.list);
      setLoading(false);
    } catch (er) {
      console.log(er);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (firstRender) {
      initPage();
      setFirstRender(false);
    } else {
      const dayToShow = new Date();
      dayToShow.setDate(today.getDate() + parseInt(active));
      handleForecastArray(dayToShow, forecast.list);
    }
  }, [active]);

  return (
    <>
      {" "}
      {loading ? (
        <div className="d-flex justify-content-center mt-3">
          <Spinner />
        </div>
      ) : (
        <div className="bg-success p-3 pt-0">
          <div className="d-flex align-items-center mb-2  ">
            <div className="p-2 border border-1 border-secondary bg-secondary-subtle h4rem d-flex align-items-center flex-grow-1 justify-content-evenly">
              <h3 className="m-0">
                name:{" "}
                <span className="text-decoration-underline text-primary fw-bold">
                  {forecast.city.name}
                </span>
              </h3>
              <h3 className="m-0">
                country:{" "}
                <span className="text-decoration-underline text-primary fw-bold">
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
                  setIndex(0);
                }}
                className={
                  "fw-bold " + (active === "0" ? "text-dark" : "text-light")
                }
              >
                Oggi
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                eventKey="1"
                onClick={() => {
                  setActive("1");
                  setIndex(1);
                }}
                className={
                  "fw-bold " + (active === "1" ? "text-dark" : "text-light")
                }
              >
                {secondDay.toString().slice(4, 10)}
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                eventKey="2"
                onClick={() => {
                  setActive("2");
                  setIndex(2);
                }}
                className={
                  "fw-bold " + (active === "2" ? "text-dark" : "text-light")
                }
              >
                {thirdDay.toString().slice(4, 10)}
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                eventKey="3"
                onClick={() => {
                  setActive("3");
                  setIndex(3);
                }}
                className={
                  "fw-bold " + (active === "3" ? "text-dark" : "text-light")
                }
              >
                {fourthDay.toString().slice(4, 10)}
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                eventKey="4"
                onClick={() => {
                  setActive("4");
                  setIndex(4);
                }}
                className={
                  "fw-bold " + (active === "4" ? "text-dark" : "text-light")
                }
              >
                {fifthDay.toString().slice(4, 10)}
              </Nav.Link>
            </Nav.Item>
          </Nav>
          <Carousel
            activeIndex={index}
            onSelect={handleSelect}
            interval={null}
            indicators={false}
            className="d-md-none bg-white "
            prevIcon={
              <Button className="border rounded-circle bg-transparent text-black fs-2">
                <i className="bi bi-chevron-double-left"></i>
              </Button>
            }
            nextIcon={
              <Button className="border rounded-circle bg-transparent text-black fs-2">
                <i className="bi bi-chevron-double-right"></i>
              </Button>
            }
          >
            <Carousel.Item>
              <Alert className="m-0 text-center fw-bold rounded-0">Oggi</Alert>
            </Carousel.Item>
            <Carousel.Item>
              <Alert className="m-0 text-center fw-bold rounded-0">
                {secondDay.toString().slice(4, 10)}
              </Alert>
            </Carousel.Item>
            <Carousel.Item>
              <Alert className="m-0 text-center fw-bold rounded-0">
                {thirdDay.toString().slice(4, 10)}
              </Alert>
            </Carousel.Item>
            <Carousel.Item>
              <Alert className="m-0 text-center fw-bold rounded-0">
                {fourthDay.toString().slice(4, 10)}
              </Alert>
            </Carousel.Item>
            <Carousel.Item>
              <Alert className="m-0 text-center fw-bold rounded-0">
                {fifthDay.toString().slice(4, 10)}
              </Alert>
            </Carousel.Item>
          </Carousel>

          <ForecastTab foreArray={forecastArray} />
        </div>
      )}
    </>
  );
};

export default Forecast;
