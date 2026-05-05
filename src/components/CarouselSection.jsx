import Carousel from "react-bootstrap/Carousel";
import CityItem from "./CityItem";
const CarouselSection = function () {
  return (
    <Carousel
      controls={false}
      indicators={false}
      className="bg-secondary"
      interval={2500}
    >
      <Carousel.Item>
        <CityItem city={"roma"} />
      </Carousel.Item>
      <Carousel.Item>
        <img src="https://placecats.com/300/500" />
      </Carousel.Item>
      <Carousel.Item>
        <img src="https://placecats.com/300/500" />
      </Carousel.Item>
    </Carousel>
  );
};

export default CarouselSection;
