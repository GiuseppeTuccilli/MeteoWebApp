import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const NewNavbar = function () {
  const [isexpanded, setIsExpanded] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <>
      <nav
        className={
          "position-fixed w-100 px-2 pt-2 d-lg-flex align-items-center justify-content-between pt-lg-0 overflow-y-hidden z-1 " +
          (isexpanded && " height12rem")
        }
      >
        <div className=" d-flex align-items-center justify-content-between ">
          <div className="d-flex">
            <button
              className="btn btn-primary rounded-start-pill fs-3"
              onClick={() => {
                navigate(-1);
              }}
            >
              <i className="bi bi-arrow-left-short"></i>
            </button>
            <button
              className="btn btn-primary rounded-end-pill fs-3"
              onClick={() => {
                navigate(+1);
              }}
            >
              <i className="bi bi-arrow-right-short"></i>
            </button>
          </div>

          <div className="d-flex align-items-center d-lg-none">
            <img
              className="m-0 rounded-1"
              src="https://media.istockphoto.com/id/1219159429/it/vettoriale/icona-meteo-isolata-su-sfondo-bianco-vettore-simbolo-meteorologico-icona-meteo-logo-meteo.jpg?s=612x612&w=0&k=20&c=zaq0zbd8pvn1tZYUjEsSX8htsru7NY01J2Y7626gszI="
            />
            <button
              className="navTog ms-1 btn btn-secondary border border-1 border-secondary-subtle fs-3"
              onClick={() => {
                setIsExpanded(!isexpanded);
              }}
            >
              <i className="bi bi-list"></i>
            </button>
          </div>
        </div>
        {isexpanded && <hr className="d-lg-none my-2 text-white" />}
        <ul
          className={
            (!isexpanded && "d-none d-lg-flex ") +
            " p-0 mb-0 ms-4 mt-2 m-lg-0 list-unstyled d-lg-flex flex-lg-grow-1 justify-content-around"
          }
        >
          <li className="mb-1 m-lg-0">
            <Link
              to={"/"}
              className={" fs-5 " + (location.pathname === "/" && "linkAttivo")}
            >
              Home
            </Link>
          </li>
          <li className="mb-1 m-lg-0">
            <Link
              to={"/forecast"}
              className={
                " fs-5 " + (location.pathname === "/forecast" && "linkAttivo")
              }
            >
              Previsioni
            </Link>
          </li>
          <li className="mb-1 m-lg-0">
            <Link
              to={"/current"}
              className={
                " fs-5 " + (location.pathname === "/current" && "linkAttivo")
              }
            >
              Corrente
            </Link>
          </li>
        </ul>
        <img
          className="m-0 rounded-1 d-none d-lg-inline"
          src="https://media.istockphoto.com/id/1219159429/it/vettoriale/icona-meteo-isolata-su-sfondo-bianco-vettore-simbolo-meteorologico-icona-meteo-logo-meteo.jpg?s=612x612&w=0&k=20&c=zaq0zbd8pvn1tZYUjEsSX8htsru7NY01J2Y7626gszI="
        />
      </nav>
    </>
  );
};

export default NewNavbar;
