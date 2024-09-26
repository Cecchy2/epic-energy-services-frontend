import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MyNavbar from "./components/MyNavbar";
import Login from "./components/Login";
import AdminFatturePage from "./components/AdminFatturePage";
import { Container } from "react-bootstrap";

function App() {
  return (
    <>
      <BrowserRouter>
        <MyNavbar />
        <Container>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/admin" element={<AdminFatturePage />} />
            {/* <Route path="/user" element={<AdminFatturePage />} /> */}
          </Routes>
        </Container>
      </BrowserRouter>
    </>
  );
}

export default App;
