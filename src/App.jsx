import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MyNavbar from "./components/MyNavbar";
import Login from "./components/Login";
import { Container } from "react-bootstrap";

function App() {
  return (
    <>
      <BrowserRouter>
        <MyNavbar />
        <Container>
          <Routes>
            <Route path="/" element={<Login />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </>
  );
}

export default App;
