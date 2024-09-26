import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

const Registrazione = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    nome: "",
    cognome: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/authorization/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        navigate("/login");
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Errore durante la registrazione");
      }
    } catch (error) {
      setErrorMessage("Errore durante la richiesta: " + error.message);
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col md={6}>
          <h1>Registrazione</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                minLength="3"
                maxLength="20"
                placeholder="Inserisci il tuo username"
              />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Inserisci la tua email"
              />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Inserisci la tua password"
              />
            </Form.Group>

            <Form.Group controlId="formNome">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                required
                minLength="3"
                maxLength="20"
                placeholder="Inserisci il tuo nome"
              />
            </Form.Group>

            <Form.Group controlId="formCognome">
              <Form.Label>Cognome</Form.Label>
              <Form.Control
                type="text"
                name="cognome"
                value={formData.cognome}
                onChange={handleChange}
                required
                minLength="3"
                maxLength="40"
                placeholder="Inserisci il tuo cognome"
              />
            </Form.Group>

            {errorMessage && <p className="text-danger">{errorMessage}</p>}

            <Button variant="primary" type="submit" className="mt-3">
              Registrati
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Registrazione;
