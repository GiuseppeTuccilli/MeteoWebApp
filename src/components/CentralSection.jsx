import { Row } from "react-bootstrap";
import CityCard from "./CityCard";

const CentralSection = () => {
  return (
    <Row className="justify-content-center my-3 g-2">
      <CityCard city="roma" />
      <CityCard city="paris" />
      <CityCard city="new york" />
      <CityCard city="tokyo" />
      <CityCard city="london" />
      <CityCard city="pechino" />
    </Row>
  );
};
export default CentralSection;
