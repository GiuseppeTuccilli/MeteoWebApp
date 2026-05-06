import Carousel from "react-bootstrap/Carousel";
import CityItem from "./CityItem";
const CarouselSection = function () {
  return (
    <Carousel
      controls={false}
      indicators={false}
      className=" p-3"
      interval={2500}
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
  );
};

export default CarouselSection;
