import SearchComponent from "./SearchComponent";
import Alert from "react-bootstrap/Alert";

const PrevisioniPage = function () {
  return (
    <>
      <div className="text-center text-light  border border-2 border-primary mb-1 py-2 px-4 bg-secondary w-100">
        <h2>Previsioni Meteo</h2>
      </div>

      <SearchComponent current={false} />
    </>
  );
};

export default PrevisioniPage;
