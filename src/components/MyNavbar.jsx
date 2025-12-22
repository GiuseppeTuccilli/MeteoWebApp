import Container from "react-bootstrap/Container";

import Navbar from "react-bootstrap/Navbar";

import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const MyNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  return (
    <Navbar
      expand="lg"
      className="bg-body-tertiary px-4 position-fixed z-1 w-100 "
      bg="dark"
      data-bs-theme="dark"
    >
      <Container fluid>
        <Navbar.Brand href="#">
          METEO
          <img
            style={{ height: "2em", marginLeft: "1em" }}
            src="https://media.istockphoto.com/id/1219159429/it/vettoriale/icona-meteo-isolata-su-sfondo-bianco-vettore-simbolo-meteorologico-icona-meteo-logo-meteo.jpg?s=612x612&w=0&k=20&c=zaq0zbd8pvn1tZYUjEsSX8htsru7NY01J2Y7626gszI="
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <ul className="navbar-nav flex-grow-1">
            <li className="nav-item">
              <Link
                className={
                  "nav-link " + (location.pathname === "/" ? "active" : "")
                }
                to={"/"}
              >
                Home
              </Link>
            </li>
          </ul>
          <form
            className="d-flex"
            role="search"
            onSubmit={(e) => {
              e.preventDefault();
              navigate("/" + input);
            }}
          >
            <input
              className="form-control me-2"
              type="search"
              placeholder="Cerca città..."
              aria-label="Search"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
              }}
            />
            <button className="btn btn-outline-info" type="submit">
              <i className="bi bi-search fw-bold"></i>
            </button>
          </form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default MyNavbar;
