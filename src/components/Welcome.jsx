import Alert from "react-bootstrap/Alert";
const Welcome = () => {
  return (
    <div
      style={{ height: "10.3em" }}
      className="d-flex flex-column justify-content-end align-items-center border border-2 border-light bg-secondary-subtle"
    >
      <div className="text-center text-light  border border-2 border-primary mb-1 py-2 px-4 bg-secondary">
        <h2>METEO ATTUALE</h2>
        <p className="text-center m-0">
          Clicca su <span className="fw-bold text-info">Dettagli</span> per
          maggiori informazioni
        </p>
      </div>
    </div>
  );
};
export default Welcome;
