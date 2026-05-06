import "./App.css";
import "./style/custom-bootstrap.scss";
import "bootstrap-icons/font/bootstrap-icons.css";

import MyNavbar from "./components/MyNavbar.jsx";
import { Container } from "react-bootstrap";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CentralSection from "./components/CentralSection.jsx";
import Welcome from "./components/Welcome.jsx";
import DetailsNew from "./components/DetailsNew.jsx";
import Map from "./components/Map.jsx";
import CarouselSection from "./components/CarouselSection.jsx";
import CurrentWheater from "./components/CurrentWheater.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <MyNavbar />

        <Container className="shadow pb-3 mainContainer ">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Welcome />
                  <CarouselSection />
                </>
              }
            />
            <Route path="/:city/:country" element={<DetailsNew />} />
            <Route path="/:city" element={<DetailsNew />} />
            <Route path="/map" element={<Map />} />
            <Route path="/current/:lat/:lon" element={<CurrentWheater />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </>
  );
}

export default App;
