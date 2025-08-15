import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navigacija from "./komponente/Navigacija";
import Footer from "./komponente/Footer";
import {Container} from "react-bootstrap";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Prijava from "./stranice/Prijava";
import Pocetna from "./stranice/Pocetna";
import ONama from "./stranice/ONama";
import Putovanja from "./stranice/Putovanja";
import Kontakt from "./stranice/Kontakt";
import MojaPutovanja from "./stranice/MojaPutovanja";
import Admin from "./stranice/Admin";

function App() {
  return (
    <>
        <div className="App">
            <Navigacija />
            <div className="glavni-sadrzaj">
                <Container>
                    <BrowserRouter>
                        <Routes>
                            <Route element={<Pocetna />} path="/" />
                            <Route element={<ONama />} path="/o-nama" />
                            <Route element={<Putovanja />} path="/putovanja" />
                            <Route element={<Kontakt />} path="/kontakt" />
                            <Route element={<MojaPutovanja />} path="/moja-putovanja" />
                            <Route element={<Admin />} path="/admin" />
                            <Route element={<Prijava />} path="/prijava" />
                        </Routes>
                    </BrowserRouter>
                </Container>
            </div>
            <Footer/>
        </div>


    </>
  );
}

export default App;
