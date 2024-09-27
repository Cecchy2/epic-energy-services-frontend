import { useEffect, useState } from "react";
import { Button, Container, Form, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";

const UserPage = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({ nome: "", cognome: "", email: "" });
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/utenti/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        setUser(data);
        setFormData({ nome: data.nome, cognome: data.cognome, email: data.email });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userId]);

  const changeUpdate = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const cambiaAvatar = (e) => {
    setAvatar(e.target.files[0]);
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3001/utenti/me`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      alert("Profilo aggiornato con successo!");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const uploadAvatar = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("pic", avatar);

    try {
      const response = await fetch(`http://localhost:3001/utenti/me`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload avatar");
      }

      alert("Avatar aggiornato con successo!");
    } catch (error) {
      console.error("Error uploading avatar:", error);
    }
  };

  const cancellaProfilo = async () => {
    const confirmDelete = window.confirm("Sei sicuro di voler eliminare il tuo profilo?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:3001/utenti/me`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete profile");
      }

      alert("Profilo eliminato con successo!");
    } catch (error) {
      console.error("Error deleting profile:", error);
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="text-center mt-5">
      <h1 className="mb-5">Pagina Utente</h1>
      <img
        src={user.avatar || "https://ui-avatars.com/api/?name=Mireya+Brakus"}
        alt="avatar"
        className="mt-5 mb-3"
        width={300}
        height={300}
      />
      <h2 className="mb-3">
        {user.nome} {user.cognome}
      </h2>
      <h3>{user.username}</h3>
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={6}>
            <Form onSubmit={handleUpdateProfile} className="mb-4">
              <Form.Group controlId="formNome">
                <Form.Label>Cambia Nome</Form.Label>
                <Form.Control
                  type="text"
                  name="nome"
                  placeholder="Nome"
                  value={formData.nome}
                  onChange={changeUpdate}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formCognome">
                <Form.Label>Cambia Cognome</Form.Label>
                <Form.Control
                  type="text"
                  name="cognome"
                  placeholder="Cognome"
                  value={formData.cognome}
                  onChange={changeUpdate}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formEmail">
                <Form.Label>Cambia Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={changeUpdate}
                  required
                />
              </Form.Group>

              <Button type="submit" variant="primary">
                Aggiorna Profilo
              </Button>
            </Form>

            <Form onSubmit={uploadAvatar} className="mb-4">
              <Form.Group controlId="formFile">
                <Form.Label>Carica Avatar</Form.Label>
                <Form.Control type="file" onChange={cambiaAvatar} accept="image/*" required />
              </Form.Group>
              <Button type="submit" variant="secondary">
                Cambia Avatar
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>

      <Button onClick={cancellaProfilo} variant="danger">
        Elimina Profilo
      </Button>
    </div>
  );
};

export default UserPage;
