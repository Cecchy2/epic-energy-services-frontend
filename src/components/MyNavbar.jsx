import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import fulmine from "../assets/fulmine.png";

const MyNavbar = () => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <img src={fulmine} alt="Logo" width={30} className="me-3" />
        <Navbar.Brand href="#home">Epic-Energy-Services</Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
