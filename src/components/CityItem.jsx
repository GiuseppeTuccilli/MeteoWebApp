import { useEffect, useState } from "react";
import { getCoordinates, getWheater } from "../files/functions";
import { Col, Row, Spinner } from "react-bootstrap";

const CityItem = function (props) {
  const [loading, setLoading] = useState(true);
  const [cityWheater, setCityWheater] = useState(null);

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

      const data = await getWheater(cor);
      setCityWheater(data);
      setLoading(false);
    } catch (er) {
      console.log(er);
      setLoading(false);
    }
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
                <div className="d-flex align-items-center justify-content-center ">
                  <h3 className="m-0">{cityWheater.name}</h3>
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
                <button className="btn btn-primary fw-bold">
                  Previsioni <i className="bi bi-box-arrow-up-right"></i>
                </button>
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
            </>
          )}
        </Col>
      </Row>
    </>
  );
};

export default CityItem;
