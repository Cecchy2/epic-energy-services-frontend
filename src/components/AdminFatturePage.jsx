import { useEffect, useState } from "react";
import { Button, Modal, Table, Form } from "react-bootstrap";

const AdminFatturePage = () => {
  const [fatture, setFatture] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedFattura, setSelectedFattura] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleUpdateStatoFattura = async () => {
    try {
      const token = localStorage.getItem("authToken");
      console.log("Stato Fattura inviato:", selectedFattura.statoFattura); // Debug

      const response = await fetch(`http://localhost:3001/fatture/${selectedFattura.id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          statoFattura: selectedFattura.statoFattura,
        }),
      });

      if (!response.ok) {
        throw new Error("Errore durante la modifica dello stato della fattura");
      }

      const updatedFattura = await response.json();

      setFatture((prevFatture) => ({
        ...prevFatture,
        content: prevFatture.content.map((fattura) => (fattura.id === updatedFattura.id ? updatedFattura : fattura)),
      }));
      setShowModal(false);
    } catch (error) {
      console.error("Errore durante la modifica dello stato:", error);
    }
  };

  const fetchFatture = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        throw new Error("Token non trovato nel localStorage");
      }

      const resp = await fetch("http://localhost:3001/fatture", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (resp.ok) {
        const data = await resp.json();
        setFatture(data);
      } else {
        const errorMessage = await resp.text();
        throw new Error(`Errore nel recupero delle fatture: ${errorMessage}`);
      }
    } catch (err) {
      console.error(err);
      setErrorMessage(err.message);
    }
  };

  const fatturaSelect = (fattura) => {
    setSelectedFattura(fattura);
    setShowModal(true);
  };

  const DeleteFattura = async (fatturaId) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(`http://localhost:3001/fatture/${fatturaId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Errore durante l'eliminazione della fattura");
      }

      setFatture((prevFatture) => ({
        ...prevFatture,
        content: prevFatture.content.filter((fattura) => fattura.id !== fatturaId),
      }));
      console.log(`Fattura con ID ${fatturaId} eliminata correttamente.`);
    } catch (error) {
      console.error("Errore durante l'eliminazione:", error);
    }
  };

  const handleSaveChanges = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(`http://localhost:3001/fatture/${selectedFattura.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          dataFattura: selectedFattura.dataFattura,
          importo: selectedFattura.importo,
          clienteId: selectedFattura.clienteId,
          statoFattura: selectedFattura.statoFattura,
        }),
      });

      if (!response.ok) {
        throw new Error("Errore durante la modifica della fattura");
      }

      const updatedFattura = await response.json();

      setFatture((prevFatture) => ({
        ...prevFatture,
        content: prevFatture.content.map((fattura) => (fattura.id === updatedFattura.id ? updatedFattura : fattura)),
      }));
      setShowModal(false);
    } catch (error) {
      console.error("Errore durante la modifica:", error);
    }
  };

  useEffect(() => {
    fetchFatture();
  }, []);

  return (
    <div>
      <h1 className="mt-5">Gestisci Fatture</h1>
      {errorMessage && <p className="text-danger">{errorMessage}</p>}
      {fatture ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Numero Fattura</th>
              <th>Cliente</th>
              <th>Stato</th>
              <th>Data</th>
              <th>Importo</th>
              <th>Azioni</th>
            </tr>
          </thead>
          <tbody>
            {fatture.content && fatture.content.length > 0 ? (
              fatture.content.map((fattura) => (
                <tr key={fattura.id}>
                  <td>{fattura.numeroFattura}</td>
                  <td>{fattura.clienteId}</td>
                  <td>{fattura.statoFattura}</td>
                  <td>{fattura.dataFattura}</td>
                  <td>{fattura.importo}</td>
                  <td>
                    <Button variant="secondary" onClick={() => fatturaSelect(fattura)}>
                      Modifica
                    </Button>
                    <Button variant="secondary" onClick={() => DeleteFattura(fattura.id)}>
                      Elimina
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">Nessuna fattura disponibile</td>
              </tr>
            )}
          </tbody>
        </Table>
      ) : (
        <p>Caricamento in corso...</p>
      )}

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Modifica Fattura</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedFattura && (
            <Form>
              <Form.Group controlId="formDataFattura">
                <Form.Label>Data Fattura</Form.Label>
                <Form.Control
                  type="date"
                  value={selectedFattura.dataFattura}
                  onChange={(e) => setSelectedFattura({ ...selectedFattura, dataFattura: e.target.value })}
                />
              </Form.Group>

              <Form.Group controlId="formImportoFattura">
                <Form.Label>Importo</Form.Label>
                <Form.Control
                  type="number"
                  value={selectedFattura.importo}
                  onChange={(e) => setSelectedFattura({ ...selectedFattura, importo: e.target.value })}
                />
              </Form.Group>

              <Form.Group controlId="formClienteId">
                <Form.Label>Cliente ID</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedFattura.clienteId}
                  onChange={(e) => setSelectedFattura({ ...selectedFattura, clienteId: e.target.value })}
                />
              </Form.Group>

              <Form.Group controlId="formStatoFattura">
                <Form.Label>Stato Fattura</Form.Label>
                <Form.Select
                  aria-label="Seleziona stato fattura"
                  value={selectedFattura.statoFattura}
                  onChange={(e) => setSelectedFattura({ ...selectedFattura, statoFattura: e.target.value })}
                >
                  <option value="">Seleziona lo stato</option>{" "}
                  <Form.Group controlId="formStatoFattura">
                    <Form.Label>Stato Fattura</Form.Label>
                    <Form.Select
                      aria-label="Seleziona stato fattura"
                      value={selectedFattura.statoFattura}
                      onChange={(e) => setSelectedFattura({ ...selectedFattura, statoFattura: e.target.value })}
                    >
                      <option value="">Seleziona lo stato</option>
                      <option value="CREATA">CREATA</option>
                      <option value="INVIATA">INVIATA</option>
                      <option value="PAGATA">PAGATA</option>
                      <option value="ANNULLATA">ANNULLATA</option>
                      <option value="RIMBORSATA">RIMBORSATA</option>
                    </Form.Select>
                  </Form.Group>
                  <option value="CREATA">CREATA</option>
                  <option value="INVIATA">INVIATA</option>
                  <option value="PAGATA">PAGATA</option>
                  <option value="ANNULLATA">ANNULLATA</option>
                  <option value="RIMBORSATA">RIMBORSATA</option>
                </Form.Select>
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
          <Button variant="primary" onClick={handleUpdateStatoFattura}>
            Salva stato
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminFatturePage;
