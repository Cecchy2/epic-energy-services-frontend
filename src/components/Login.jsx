import { useState } from "react";
import { Button, Col, Form, Row, Container } from "react-bootstrap";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/authorization/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();

      localStorage.setItem("authToken", data.token);
      console.log("Login successful, token saved:", data.token);
    } catch (error) {
      setErrorMessage("Login failed. Please check your credentials.");
      console.error("Error during login:", error);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center mt-5">
      <Row className="w-100 mt-5">
        <Col md={6} className="mx-auto">
          <div className="form-container">
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              {errorMessage && <p className="text-danger">{errorMessage}</p>}

              <Button variant="primary" type="submit" className="w-100">
                Submit
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
