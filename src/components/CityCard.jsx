import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Col, Button, Spinner } from "react-bootstrap";

const CityCard = (props) => {
  const [city, setCity] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  let img = "";
  if (props.city === "roma") {
    img =
      "https://www.fulltravel.it/wp-content/uploads/2019/11/Cosa-vedere-a-Roma.jpg";
  } else if (props.city === "new york") {
    img = "https://www.travelguide.uno/media/new-york.jpeg";
  } else if (props.city === "london") {
    img =
      "https://res.cloudinary.com/aenetworks/image/upload/c_fill,ar_2,w_3840,h_1920,g_auto/dpr_auto/f_auto/q_auto:eco/v1/topic-london-gettyimages-760251843-feature?_a=BAVAZGDX0";
  } else if (props.city === "tokyo") {
    img =
      "https://digital.ihg.com/is/image/ihg/exp-des-Tokyo-972x340-3?ts=1695682130526&dpr=off";
  } else if (props.city === "paris") {
    img =
      "https://a.travel-assets.com/findyours-php/viewfinder/images/res70/474000/474240-Left-Bank-Paris.jpg";
  } else {
    img =
      "https://www.creativefabrica.com/wp-content/uploads/2022/07/31/Wheater-Clipart-Graphics-35173095-1.jpg";
  }

  useEffect(() => {
    getCity(props.city);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getCity = (city) => {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&appid=907082adf259a39f128ff2e434487c57&units=metric"
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("errore");
        }
      })
      .then((data) => {
        setCity(data);
        setLoading(false);
      })
      .catch((er) => {
        alert("errore nel recupero dati meteo attuale", er);
      });
  };

  return (
    <Col xs={6} md={4}>
      {loading && (
        <div className="text-center">
          <Spinner variant="danger" />
        </div>
      )}
      <Card className="bg-secondary text-white ">
        <Card.Img
          style={{ height: "15em", objectFit: "cover" }}
          variant="top"
          src={img}
        />
        <Card.Body>
          {city !== null && (
            <>
              <Card.Title className="m-0">
                {city.name}{" "}
                <img
                  src={
                    "https://openweathermap.org/img/wn/" +
                    city.weather[0].icon +
                    ".png"
                  }
                />
              </Card.Title>

              <Card.Text className="m-0">
                Temperarura: {city.main.temp}°C{" "}
              </Card.Text>
              <Card.Text className="m-0">
                Percepita: {city.main.feels_like} °C{" "}
              </Card.Text>
              <Card.Text>Velocità vento: {city.wind.speed} </Card.Text>
              <Button
                variant="primary"
                onClick={() => {
                  navigate("/" + city.name + "/" + city.sys.country);
                }}
              >
                Dettagli
              </Button>
            </>
          )}
        </Card.Body>
      </Card>
    </Col>
  );
};

export default CityCard;
