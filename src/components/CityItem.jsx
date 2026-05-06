import { useEffect, useState } from "react";
import { getCoordinates } from "../files/functions";

const CityItem = function (props) {
  const [cityWheater, setCityWheater] = useState(null);

  const city = props.city;

  useEffect(() => {}, []);

  return <></>;
};

export default CityItem;
