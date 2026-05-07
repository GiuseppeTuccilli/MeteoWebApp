import "./App.css";
import "./style/custom-bootstrap.scss";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Container } from "react-bootstrap";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./components/Welcome.jsx";
import CarouselSection from "./components/CarouselSection.jsx";
import CurrentWheater from "./components/CurrentWheater.jsx";
import Forecast from "./components/Forecast.jsx";
import PrevisioniPage from "./components/PrevisioniPage.jsx";
import CurrentPage from "./components/CurrentPage.jsx";
import NewNavbar from "./components/NewNavbar.jsx";
import MyFooter from "./components/MyFooter.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <NewNavbar />
        <Container className="shadow pb-3 mainContainer flex-grow-1">
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
            <Route path="/forecast" element={<PrevisioniPage />} />
            <Route path="/current" element={<CurrentPage />} />
            <Route path="/current/:lat/:lon" element={<CurrentWheater />} />
            <Route path="/forecast/:lat/:lon" element={<Forecast />} />
          </Routes>
        </Container>
        <MyFooter />
      </BrowserRouter>
    </>
  );
}

export default App;
