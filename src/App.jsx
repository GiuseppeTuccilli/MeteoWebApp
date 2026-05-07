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
import Forecast from "./components/Forecast.jsx";
import PrevisioniPage from "./components/PrevisioniPage.jsx";
import CurrentPage from "./components/CurrentPage.jsx";
import NewNavbar from "./components/NewNavbar.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <NewNavbar />

        <Container className="shadow pb-3 mainContainer vh-100">
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
            <Route path="/forecast" element={<PrevisioniPage />} />
            <Route path="/current" element={<CurrentPage />} />
            <Route path="/current/:lat/:lon" element={<CurrentWheater />} />
            <Route path="/forecast/:lat/:lon" element={<Forecast />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </>
  );
}

export default App;
