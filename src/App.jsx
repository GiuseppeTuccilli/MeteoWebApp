import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import MyNavbar from "./components/MyNavbar.jsx";
import { Container } from "react-bootstrap";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CentralSection from "./components/CentralSection.jsx";
import Welcome from "./components/Welcome.jsx";
import DetailsNew from "./components/DetailsNew.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <MyNavbar />

        <Container className="shadow pb-3">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Welcome />
                  <CentralSection />
                </>
              }
            />
            <Route path="/:city/:country" element={<DetailsNew />} />
            <Route path="/:city" element={<DetailsNew />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </>
  );
}

export default App;
