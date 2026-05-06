import { Col, Row } from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

const SearchComponent = function () {
  return (
    <>
      <div className="p-2 border border-2 border-light bg-secondary-subtle mb-2">
        <h3 className="m-0 text-center mb-1">Ricerca Località</h3>
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
            />
          </FloatingLabel>
        </div>
        <div className="d-flex justify-content-evenly my-1">
          <button className="btn btn-success fw-bold ">Meteo</button>
          <button className="btn btn-success fw-bold ">Previsioni</button>
        </div>
        <div className="results border border-2 border-secondary rounded-4 p-2">
          <div className="h-100 overflow-y-scroll">
            <div class="list-group  ">
              <a href="#" class="list-group-item list-group-item-action ">
                A second link item
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchComponent;
