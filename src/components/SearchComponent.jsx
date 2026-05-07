import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { getCoordinates } from "../files/functions";
import { useNavigate } from "react-router-dom";

const SearchComponent = function () {
  const [results, setResults] = useState(null);
  const [text, setText] = useState("");
  const [selCord, setSelCord] = useState({
    lat: null,
    lon: null,
  });

  const navigate = useNavigate();

  const goCurrent = function () {
    navigate("/current/" + selCord.lat + "/" + selCord.lon);
  };

  const goForecast = function () {
    navigate("/forecast/" + selCord.lat + "/" + selCord.lon);
  };

  const getResults = async function () {
    try {
      const data = await getCoordinates(text);
      setResults(data);
      console.log(data);
    } catch (er) {
      console.log(er);
    }
  };

  return (
    <>
      <div className="p-2 border border-2 border-light bg-secondary-subtle mb-2">
        <h3 className="m-0 text-center mb-1">Ricerca Località</h3>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            if (text === "") {
              return;
            }
            getResults();
          }}
        >
          <div className="d-flex">
            <button className="bg-white btn border border-2 border-end-0 rounded-end-0 rounded-start-pill px-4 border-secondary-subtle  subSearch">
              <i className="bi bi-search"></i>
            </button>
            <FloatingLabel
              controlId="floatingInput"
              label="Nome Città..."
              className="flex-grow-1"
            >
              <Form.Control
                type="text"
                placeholder="Nome Città"
                className="m-0 rounded-end-pill border border-2 border-secondary-subtle border-start-0 "
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                }}
              />
            </FloatingLabel>
          </div>
        </Form>
        <div className="d-flex justify-content-evenly my-1 ">
          <button
            className={
              "btn btn-primary fw-bold " +
              ((selCord.lat === null || selCord.lon === null) && "opacity-0")
            }
            onClick={goCurrent}
          >
            Meteo <i className="bi bi-box-arrow-up-right"></i>
          </button>
          <button
            className={
              "btn btn-primary fw-bold " +
              ((selCord.lat === null || selCord.lon === null) && "opacity-0")
            }
            onClick={goForecast}
          >
            Previsioni <i className="bi bi-box-arrow-up-right"></i>
          </button>
        </div>
        <div className="results border border-2 border-secondary rounded-4 p-2">
          <div className="h-100 overflow-y-scroll">
            {results !== null &&
              results.map((el) => {
                return (
                  <div className="list-group  " key={el.i}>
                    <a
                      href="javascript:void(0)"
                      onClick={() => {
                        setSelCord({
                          lat: el.lat,
                          lon: el.lon,
                        });
                      }}
                      className={
                        "list-group-item list-group-item-action text-primary " +
                        (selCord.lat === el.lat &&
                          selCord.lon === el.lon &&
                          " border border-1 border-primary text-decoration-underline")
                      }
                    >
                      Name: <span className="fw-bold">{el.name}</span> |
                      Country: <span className="fw-bold">{el.country}</span> |
                      State: <span className="fw-bold">{el.state}</span>
                    </a>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchComponent;
