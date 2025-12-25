import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Alert, Button, Col, Container, Row, Spinner } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Nav from "react-bootstrap/Nav";
import Carousel from "react-bootstrap/Carousel";

const DetailsNew = () => {
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const [active, setActive] = useState("0");
  const [dati, setDati] = useState(null);
  const [index, setIndex] = useState(0);

  let endpoint = "";

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
    setActive(selectedIndex.toString());
  };

  const oggi = new Date();
  let dayToShow = new Date(oggi);
  let annoString = "";
  let mese = 0;
  let giorno = 0;

  let domani = new Date(oggi);
  domani.setDate(domani.getDate() + 1);

  let dueGg = new Date(oggi);
  dueGg.setDate(dueGg.getDate() + 2);

  let treGg = new Date(oggi);
  treGg.setDate(treGg.getDate() + 3);

  let quattroGg = new Date(oggi);
  quattroGg.setDate(quattroGg.getDate() + 4);

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params, active]);

  const getData = () => {
    if (params.country === undefined) {
      endpoint =
        "https://api.openweathermap.org/data/2.5/forecast?q=" +
        params.city +
        "&appid=907082adf259a39f128ff2e434487c57&units=metric";
    } else {
      endpoint =
        "https://api.openweathermap.org/data/2.5/forecast?q=" +
        params.city +
        "," +
        params.country +
        "&appid=907082adf259a39f128ff2e434487c57&units=metric";
    }

    fetch(endpoint)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("errore");
        }
      })
      .then((data) => {
        console.log(data);
        setLoading(false);

        dayToShow.setDate(dayToShow.getDate() + Number(active));

        annoString = dayToShow.getFullYear().toString();
        mese = dayToShow.getMonth() + 1;
        giorno = dayToShow.getDate();

        let meseString = "";
        let giornoString = "";

        if (mese < 10) {
          meseString = "0" + mese.toString();
        } else {
          meseString = mese.toString();
        }
        if (giorno < 10) {
          giornoString = "0" + giorno.toString();
        } else {
          giornoString = giorno.toString();
        }

        let dateString = annoString + "-" + meseString + "-" + giornoString;

        setDati(data.list.filter((d) => d.dt_txt.startsWith(dateString)));
      })
      .catch((er) => {
        setLoading(false);
        alert("errore nel recupero dati", er);
      });
  };
  return (
    <>
      <div
        style={{ height: "9em" }}
        className="d-flex flex-column justify-content-end align-items-center border border-2 border-light bg-secondary-subtle mb-2"
      >
        <div className="text-center text-light  border border-2 border-primary mb-1 py-2 px-4 bg-secondary">
          <h2>
            Previsioni per{" "}
            <span className="text-info fw-bold text-decoration-underline">
              {params.city.toUpperCase()}{" "}
            </span>
          </h2>
        </div>
      </div>

      {loading && (
        <div className="text-center">
          <Spinner variant="danger" />
        </div>
      )}
      <Container>
        <Row className="d-flex justify-content-center">
          <Col xs={12} md={8}>
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
                  }}
                  className="fw-bold"
                >
                  Oggi
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey="1"
                  onClick={() => {
                    setActive("1");
                  }}
                  className="fw-bold"
                >
                  {domani.toString().slice(4, 10)}
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey="2"
                  onClick={() => {
                    setActive("2");
                  }}
                  className="fw-bold"
                >
                  {dueGg.toString().slice(4, 10)}
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey="3"
                  onClick={() => {
                    setActive("3");
                  }}
                  className="fw-bold"
                >
                  {treGg.toString().slice(4, 10)}
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey="4"
                  onClick={() => {
                    setActive("4");
                  }}
                  className="fw-bold"
                >
                  {quattroGg.toString().slice(4, 10)}
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
                <Alert className="m-0 text-center fw-bold rounded-0">
                  Oggi
                </Alert>
              </Carousel.Item>
              <Carousel.Item>
                <Alert className="m-0 text-center fw-bold rounded-0">
                  {domani.toString().slice(4, 10)}
                </Alert>
              </Carousel.Item>
              <Carousel.Item>
                <Alert className="m-0 text-center fw-bold rounded-0">
                  {dueGg.toString().slice(4, 10)}
                </Alert>
              </Carousel.Item>
              <Carousel.Item>
                <Alert className="m-0 text-center fw-bold rounded-0">
                  {treGg.toString().slice(4, 10)}
                </Alert>
              </Carousel.Item>
              <Carousel.Item>
                <Alert className="m-0 text-center fw-bold rounded-0">
                  {quattroGg.toString().slice(4, 10)}
                </Alert>
              </Carousel.Item>
            </Carousel>
            <Table>
              <thead>
                <tr>
                  <th className="text-center">Ora</th>
                  <th className="text-center">Clima</th>
                  <th className="text-center">Temp</th>
                  <th className="text-center">Pioggia</th>
                </tr>
              </thead>
              <tbody>
                {dati !== null &&
                  dati.map((d) => {
                    return (
                      <tr
                        key={d.dt_txt}
                        className="text-center border-top  border-black "
                      >
                        <td className="bg-secondary text-white p-0">
                          <p className="mt-3 mb-0">
                            {d.dt_txt.split(" ")[1].slice(0, 5)}
                          </p>
                        </td>
                        <td className="bg-secondary text-white p-0">
                          <img
                            src={
                              "https://openweathermap.org/img/wn/" +
                              d.weather[0].icon +
                              ".png"
                            }
                          />
                        </td>
                        <td className="bg-secondary text-white p-0">
                          <p className="mt-3 mb-0">{d.main.temp} °C</p>
                        </td>
                        <td className="bg-secondary text-white p-0">
                          <p className="mt-3 mb-0"> {d.pop} </p>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default DetailsNew;
