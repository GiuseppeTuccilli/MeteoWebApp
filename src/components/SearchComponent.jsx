import { useState } from "react";
import { Alert, Col, Row } from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { getCoordinates } from "../files/functions";
import { useNavigate } from "react-router-dom";

const SearchComponent = function (props) {
  const [results, setResults] = useState(null);
  const [noResults, setNoResults] = useState(false);
  const [text, setText] = useState("");
  const [error, setError] = useState(false);
  const [errorMes, setErrorMes] = useState("");
  const [selCord, setSelCord] = useState({
    lat: null,
    lon: null,
  });
  let forecast = true;
  let current = true;

  if (props.forecast !== undefined && props.forecast === false) {
    forecast = false;
  }
  if (props.current !== undefined && props.current === false) {
    current = false;
  }

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
      setSelCord({ lat: null, lon: null });
      if (data.length === 0) {
        setNoResults(true);
      } else {
        setNoResults(false);
      }
      setError(false);
    } catch (er) {
      setError(true);
      setNoResults(false);
      setErrorMes(er.toString());
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
        <div className="d-flex my-1 justify-content-center ">
          <button
            disabled={
              (selCord.lat === null || selCord.lon === null || noResults) &&
              true
            }
            className={
              "btn btn-primary  fw-bold rounded-pill flex-grow-1  " +
              ((selCord.lat === null || selCord.lon === null) && "opacity-0 ") +
              (current === false && " d-none ") +
              (noResults && " opacity-0 ")
            }
            onClick={goCurrent}
          >
            Meteo <i className="bi bi-box-arrow-up-right"></i>
          </button>
          <button
            disabled={
              (selCord.lat === null || selCord.lon === null || noResults) &&
              true
            }
            className={
              "btn btn-primary  fw-bold rounded-pill flex-grow-1  " +
              ((selCord.lat === null || selCord.lon === null) && "opacity-0 ") +
              (forecast === false && " d-none ") +
              (noResults && " opacity-0 ")
            }
            onClick={goForecast}
          >
            Previsioni <i className="bi bi-box-arrow-up-right"></i>
          </button>
        </div>
        <div className="results border border-2 border-secondary rounded-4 p-2">
          <div className="h-100 overflow-y-scroll">
            {error && (
              <Alert variant="danger" className="text-center">
                {errorMes}
              </Alert>
            )}
            {noResults && (
              <div className="list-group">
                <h4 className="m-0 text-center">Nessuno Risultato</h4>
              </div>
            )}
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
