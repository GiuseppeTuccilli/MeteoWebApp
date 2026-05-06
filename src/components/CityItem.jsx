import { useEffect, useState } from "react";
import { getCoordinates, getWheater } from "../files/functions";
import { Col, Row, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const CityItem = function (props) {
  const [loading, setLoading] = useState(true);
  const [cityWheater, setCityWheater] = useState(null);
  const [cord, setCord] = useState({});
  const navigate = useNavigate();

  const city = props.city;

  const initCity = async function () {
    try {
      const ar = await getCoordinates(city);
      const itCity = ar.filter((c) => {
        return c.country === "IT";
      })[0];

      const cor = {
        lat: itCity.lat,
        lon: itCity.lon,
      };

      setCord(cor);

      const data = await getWheater(cor);
      setCityWheater(data);
      setLoading(false);
    } catch (er) {
      console.log(er);
      setLoading(false);
    }
  };

  const goDetails = function () {
    navigate("/current/" + cord.lat + "/" + cord.lon);
  };

  const goForecast = function () {
    navigate("/forecast/" + cord.lat + "/" + cord.lon);
  };

  useEffect(() => {
    initCity();
  }, []);

  return (
    <>
      <Row className="justify-content-center">
        <Col
          xs={12}
          md={10}
          lg={8}
          xl={6}
          className="border border-1 border-primary bg-success text-white px-4"
        >
          {loading ? (
            <div className="d-flex justify-content-center">
              <Spinner />
            </div>
          ) : (
            <>
              <div className="d-flex justify-content-between align-items-center mt-2">
                <h3 className="m-0 text-decoration-underline">
                  {cityWheater.name}{" "}
                </h3>
                <div className="d-flex align-items-center justify-content-center ">
                  <div className="me-2">
                    <button
                      className="btn btn-primary fw-bold"
                      onClick={goDetails}
                    >
                      Dettagli <i className="bi bi-box-arrow-up-right"></i>
                    </button>
                  </div>
                  <div>
                    <button
                      className="btn btn-primary fw-bold"
                      onClick={goForecast}
                    >
                      Previsioni <i className="bi bi-box-arrow-up-right"></i>
                    </button>
                  </div>
                </div>
              </div>
              <Row className="justify-content-center text-dark bg-secondary-subtle p-2 g-1 my-2 ">
                <Col xs={6}>
                  <p className="m-0 fs-5 text-start border border-1 border-dark p-1">
                    Temperatura:{" "}
                    <span className="text-danger">
                      {cityWheater.main.temp} °C
                    </span>
                  </p>
                </Col>
                <Col xs={6}>
                  <p className="m-0 fs-5 text-start border border-1 border-dark p-1">
                    Temp. percepita:{" "}
                    <span className="text-danger">
                      {cityWheater.main.feels_like} °C
                    </span>
                  </p>
                </Col>
                <Col xs={6}>
                  <p className="m-0 fs-5 text-start border border-1 border-dark p-1">
                    Vel. vento:{" "}
                    <span className="text-danger">
                      {cityWheater.wind.speed} m/s
                    </span>
                  </p>
                </Col>
                <Col xs={6}>
                  <p className="m-0 fs-5 text-start border border-1 border-dark p-1">
                    Umidità:{" "}
                    <span className="text-danger">
                      {cityWheater.main.humidity}
                    </span>
                  </p>
                </Col>
              </Row>
              <div className="d-flex align-items-center justify-content-center">
                <h4 className="m-0">Condizioni Meteo: </h4>{" "}
                <img
                  src={
                    "https://openweathermap.org/img/wn/" +
                    cityWheater.weather[0].icon +
                    ".png"
                  }
                />
                <p className="text-center fs-5  m-0">
                  ({cityWheater.weather[0].description})
                </p>
              </div>
            </>
          )}
        </Col>
      </Row>
    </>
  );
};

export default CityItem;
