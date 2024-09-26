import { useEffect, useState } from "react";
import { Button, Modal, Table, Form } from "react-bootstrap";

const AdminClientiPage = () => {
  const [clienti, setClienti] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedCliente, setSelectedCliente] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchClienti = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        throw new Error("Token non trovato nel localStorage");
      }

      const response = await fetch("http://localhost:3001/clienti", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setClienti(data);
      } else {
        const errorMessage = await response.text();
        throw new Error(`Errore nel recupero dei clienti: ${errorMessage}`);
      }
    } catch (err) {
      console.error(err);
      setErrorMessage(err.message);
    }
  };

  const clienteSelect = (cliente) => {
    setSelectedCliente(cliente);
    setShowModal(true);
  };

  const handleSaveChanges = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(`http://localhost:3001/clienti/${selectedCliente.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedCliente),
      });

      if (!response.ok) {
        throw new Error("Errore durante la modifica del cliente");
      }

      const updatedCliente = await response.json();

      setClienti((prevClienti) =>
        prevClienti.content.map((cliente) => (cliente.id === updatedCliente.id ? updatedCliente : cliente))
      );
      setShowModal(false);
    } catch (error) {
      console.error("Errore durante la modifica:", error);
    }
  };

  const DeleteCliente = async (clienteId) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(`http://localhost:3001/clienti/${clienteId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Errore durante l'eliminazione del cliente");
      }

      setClienti((prevClienti) => ({
        ...prevClienti,
        content: prevClienti.content.filter((cliente) => cliente.id !== clienteId),
      }));
      console.log(`Cliente con ID ${clienteId} eliminato correttamente.`);
    } catch (error) {
      console.error("Errore durante l'eliminazione:", error);
    }
  };

  useEffect(() => {
    fetchClienti();
  }, []);

  return (
    <div>
      <h1>Gestisci Clienti</h1>
      {errorMessage && <p className="text-danger">{errorMessage}</p>}
      {clienti ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Ragione Sociale</th>
              <th>Partita IVA</th>
              <th>Email</th>
              <th>Telefono</th>
              <th>Fatturato Annuale</th>
              <th>Azioni</th>
            </tr>
          </thead>
          <tbody>
            {clienti.content && clienti.content.length > 0 ? (
              clienti.content.map((cliente) => (
                <tr key={cliente.id}>
                  <td>{cliente.ragioneSociale}</td>
                  <td>{cliente.partitaIva}</td>
                  <td>{cliente.email}</td>
                  <td>{cliente.telefono}</td>
                  <td>{cliente.fatturatoAnnuale}</td>
                  <td>
                    <Button variant="secondary" onClick={() => clienteSelect(cliente)}>
                      Modifica
                    </Button>
                    <Button variant="danger" onClick={() => DeleteCliente(cliente.id)}>
                      Elimina
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">Nessun cliente disponibile</td>
              </tr>
            )}
          </tbody>
        </Table>
      ) : (
        <p>Caricamento in corso...</p>
      )}

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Modifica Cliente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedCliente && (
            <Form>
              <Form.Group controlId="formRagioneSociale">
                <Form.Label>Ragione Sociale</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedCliente.ragioneSociale}
                  onChange={(e) => setSelectedCliente({ ...selectedCliente, ragioneSociale: e.target.value })}
                />
              </Form.Group>

              <Form.Group controlId="formPartitaIva">
                <Form.Label>Partita IVA</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedCliente.partitaIva}
                  onChange={(e) => setSelectedCliente({ ...selectedCliente, partitaIva: e.target.value })}
                />
              </Form.Group>

              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={selectedCliente.email}
                  onChange={(e) => setSelectedCliente({ ...selectedCliente, email: e.target.value })}
                />
              </Form.Group>

              <Form.Group controlId="formTelefono">
                <Form.Label>Telefono</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedCliente.telefono}
                  onChange={(e) => setSelectedCliente({ ...selectedCliente, telefono: e.target.value })}
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Annulla
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Salva modifiche
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminClientiPage;
