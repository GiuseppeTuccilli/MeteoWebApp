import Alert from "react-bootstrap/Alert";
const Welcome = () => {
  return (
    <div className="text-center text-light  border border-2 border-primary mb-1 py-2 px-4 bg-secondary w-100">
      <h2>Home Page</h2>
      <p className="text-center m-0">
        Clicca su <span className="fw-bold text-info">Dettagli</span> per
        maggiori informazioni
      </p>
    </div>
  );
};
export default Welcome;
