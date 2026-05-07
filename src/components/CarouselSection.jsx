import Carousel from "react-bootstrap/Carousel";
import CityItem from "./CityItem";
import SearchComponent from "./SearchComponent";
import { Col, Row } from "react-bootstrap";
import { useState } from "react";
const CarouselSection = function () {
  const [show, setShow] = useState(false);
  return (
    <>
      <Carousel
        controls={false}
        indicators={false}
        className=" p-3"
        interval={3000}
      >
        <Carousel.Item>
          <CityItem city={"roma"} />
        </Carousel.Item>
        <Carousel.Item>
          <CityItem city={"milano"} />
        </Carousel.Item>
        <Carousel.Item>
          <CityItem city={"napoli"} />
        </Carousel.Item>
      </Carousel>
      <Row className="justify-content-center mb-2">
        <Col xs={10} md={6} className="d-flex">
          <button
            className={
              "btn flex-grow-1 fw-bold rounded-pill " +
              (show ? " btn-danger" : " btn-primary")
            }
            onClick={() => {
              setShow(!show);
            }}
          >
            {show ? "Chiudi Ricerca " : "Cerca Località "}{" "}
            {show ? (
              <i className="bi bi-x-circle"></i>
            ) : (
              <i className="bi bi-search"></i>
            )}
          </button>
        </Col>
      </Row>
      <div
        className={
          "searchDiv overflow-y-hidden " +
          (show ? " height20rem" : " height0 opacity-0")
        }
      >
        <SearchComponent />
      </div>
    </>
  );
};

export default CarouselSection;
