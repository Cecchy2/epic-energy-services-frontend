import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MyNavbar from "./components/MyNavbar";
import Login from "./components/Login";
import AdminFatturePage from "./components/AdminFatturePage";
import { Container } from "react-bootstrap";
import Home from "./components/Home";
import Registrazione from "./components/Registrazione";
import UserPage from "./components/UserPage";
import AdminHomePage from "./components/AdminHomePage";
import AdminClientiPage from "./components/AdminClientiPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <MyNavbar />
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/utenti/:userId" element={<UserPage />} />
            <Route path="/register" element={<Registrazione />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<AdminHomePage />} />
            <Route path="/adminfatturepage" element={<AdminFatturePage />} />
            <Route path="/adminClientiPage" element={<AdminClientiPage />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </>
  );
}

export default App;
