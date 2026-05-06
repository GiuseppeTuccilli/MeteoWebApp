import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getWheater } from "../files/functions";
import { Col, Row, Spinner } from "react-bootstrap";

const CurrentWheater = function () {
  const params = useParams();
  const navigate = useNavigate();
  const [wheater, setWheater] = useState(null);
  const [loading, setLoading] = useState(true);

  const cor = {
    lat: params.lat,
    lon: params.lon,
  };

  const initPage = async function () {
    try {
      const data = await getWheater(cor);
      setWheater(data);
      setLoading(false);
    } catch (er) {
      console.log("errore. " + er);
      setLoading(false);
    }
  };

  useEffect(() => {
    initPage();
  }, []);

  return (
    <>
      {loading ? (
        <div className="d-flex justify-content-center">
          <Spinner variant="primary" />
        </div>
      ) : (
        <div className="bg-success p-3">
          <div className="d-flex  text-white align-items-center  ">
            <div className="p-2 border border-1 border-secondary-subtle bg-secondary h4rem d-flex align-items-center flex-grow-1 justify-content-center">
              <h2 className="m-0">
                Città:{" "}
                <span className="text-decoration-underline text-info">
                  {wheater.name}
                </span>
              </h2>
            </div>
            <div className="p-2 border-border-1 border-secondary bg-primary-subtle text-dark h4rem d-flex align-items-center">
              <h3 className="m-0">
                Paese:{" "}
                <span className="text-decoration-underline">
                  {wheater.sys.country}
                </span>
              </h3>
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-center text-light my-2 border-bottom border-2 border-secondary-subtle ">
            <h3 className="m-0">Condizioni Meteo: </h3>
            <img
              src={
                "https://openweathermap.org/img/wn/" +
                wheater.weather[0].icon +
                ".png"
              }
            ></img>
            <p className="m-0 fs-4">({wheater.weather[0].description})</p>
          </div>
          <div className="bg-secondary-subtle py-2">
            <Row className=" justify-content-center g-1 gap-1 px-2 ">
              <Col
                xs={12}
                md={6}
                lg={4}
                className="border border-2 border-secondary d-flex flex-column align-items-center py-2 "
              >
                <h4 className="text-center m-0 text-decoration-underline">
                  Temperature
                </h4>
                <p className="m-0 fs-5 fw-bold">
                  Temp:{" "}
                  <span className="text-decoration-underline text-danger">
                    {wheater.main.temp} °C
                  </span>
                </p>
                <p className="m-0 fs-5 fw-bold">
                  Max:{" "}
                  <span className="text-decoration-underline text-danger">
                    {wheater.main.temp_max} °C
                  </span>
                </p>
                <p className="m-0 fs-5 fw-bold">
                  Min:{" "}
                  <span className="text-decoration-underline text-danger">
                    {wheater.main.temp_max} °C
                  </span>
                </p>
              </Col>
              <Col
                xs={12}
                md={6}
                lg={4}
                className="border border-2 border-secondary d-flex flex-column align-items-center py-2 "
              >
                <h4 className="text-center m-0 text-decoration-underline">
                  Vento
                </h4>
                <div className="flex-grow-1 d-flex flex-column justify-content-center">
                  <p className="m-0 fs-5 fw-bold">
                    Velocità:{" "}
                    <span className="text-decoration-underline text-danger">
                      {wheater.wind.speed} m/s
                    </span>
                  </p>
                  <p className="m-0 fs-5 fw-bold ">
                    Inclinazione:{" "}
                    <span className="text-decoration-underline text-danger">
                      {wheater.wind.deg} °
                    </span>
                  </p>
                </div>
              </Col>
              <Row className=" justify-content-center g-1 gap-1 mb-2">
                <Col
                  xs={12}
                  md={6}
                  lg={4}
                  className="border border-2 border-secondary d-flex flex-column align-items-center py-2 "
                >
                  <p className="m-0 fs-5 fw-bold ">
                    Temp. percepita:{" "}
                    <span className="text-decoration-underline text-danger">
                      {wheater.main.feels_like} °
                    </span>
                  </p>
                </Col>
                <Col
                  xs={12}
                  md={6}
                  lg={4}
                  className="border border-2 border-secondary d-flex flex-column align-items-center py-2 "
                >
                  <p className="m-0 fs-5 fw-bold ">
                    Umidità:{" "}
                    <span className="text-decoration-underline text-danger">
                      {wheater.main.humidity}
                    </span>
                  </p>
                </Col>
              </Row>
            </Row>
            <div className=" d-flex align-items-center justify-content-center">
              <button
                className="btn btn-primary fw-bold fs-5 "
                onClick={() => {
                  navigate("/forecast/" + cor.lat + "/" + cor.lon);
                }}
              >
                Vedi Previsioni
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CurrentWheater;
