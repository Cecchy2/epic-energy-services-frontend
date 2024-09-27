import { useEffect, useState } from "react";
import { Button, Modal, Table, Form } from "react-bootstrap";

const AdminClientiPage = () => {
  const [clienti, setClienti] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedCliente, setSelectedCliente] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [sortby, setSortBy] = useState("ragioneSociale");
  const [newCliente, setNewCliente] = useState({
    ragioneSociale: "",
    partitaIva: "",
    email: "",
    dataUltimoContatto: "",
    fatturatoAnnuale: "",
    pec: "",
    telefono: "",
    emailContatto: "",
    nomeContatto: "",
    cognomeContatto: "",
    telefonoContatto: "",
    tipologia: "PA",
    indirizzoSedeLegale: "",
    indirizzoSedeOperativa: "",
  });

  const fetchClienti = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        throw new Error("Token non trovato nel localStorage");
      }

      const response = await fetch(`http://localhost:3001/clienti?sortby=${sortby}`, {
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

      setClienti((prevClienti) => ({
        ...prevClienti,
        content: prevClienti.content.map((cliente) => (cliente.id === updatedCliente.id ? updatedCliente : cliente)),
      }));
      setShowModal(false);
    } catch (error) {
      console.error("Errore durante la modifica del cliente:", error);
    }
  };

  const handleCreateCliente = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch("http://localhost:3001/clienti/register", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCliente),
      });

      if (!response.ok) {
        throw new Error("Errore durante la creazione del cliente");
      }

      const createdCliente = await response.json();
      setClienti((prevClienti) => ({
        ...prevClienti,
        content: [...prevClienti.content, createdCliente],
      }));
      setShowCreateModal(false);
    } catch (error) {
      console.error("Errore durante la creazione del cliente:", error);
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
  }, [sortby]);

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  return (
    <div>
      <h1 className="mt-5">Gestisci Clienti</h1>

      <Form.Group controlId="sortby">
        <Form.Label>Ordina per</Form.Label>
        <Form.Control as="select" value={sortby} onChange={handleSortChange}>
          <option value="ragioneSociale">Ragione Sociale</option>
          <option value="fatturatoAnnuale">Fatturato Annuale</option>
          <option value="dataInserimento">Data di Inserimento</option>
          <option value="dataUltimoContatto">Data di Ultimo Contatto</option>
        </Form.Control>
      </Form.Group>

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
              <th>Data Inserimento</th>
              <th>Data Ultimo Contatto</th>
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
                  <td>{cliente.dataInserimento}</td>
                  <td>{cliente.dataUltimoContatto}</td>
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

              <Form.Group controlId="formDataUltimoContatto">
                <Form.Label>Data Ultimo Contatto</Form.Label>
                <Form.Control
                  type="date"
                  value={selectedCliente.dataUltimoContatto}
                  onChange={(e) => setSelectedCliente({ ...selectedCliente, dataUltimoContatto: e.target.value })}
                />
              </Form.Group>

              <Form.Group controlId="formPec">
                <Form.Label>PEC</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedCliente.pec}
                  onChange={(e) => setSelectedCliente({ ...selectedCliente, pec: e.target.value })}
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

              <Form.Group controlId="formEmailContatto">
                <Form.Label>Email Contatto</Form.Label>
                <Form.Control
                  type="email"
                  value={selectedCliente.emailContatto}
                  onChange={(e) => setSelectedCliente({ ...selectedCliente, emailContatto: e.target.value })}
                />
              </Form.Group>

              <Form.Group controlId="formNomeContatto">
                <Form.Label>Nome Contatto</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedCliente.nomeContatto}
                  onChange={(e) => setSelectedCliente({ ...selectedCliente, nomeContatto: e.target.value })}
                />
              </Form.Group>

              <Form.Group controlId="formCognomeContatto">
                <Form.Label>Cognome Contatto</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedCliente.cognomeContatto}
                  onChange={(e) => setSelectedCliente({ ...selectedCliente, cognomeContatto: e.target.value })}
                />
              </Form.Group>

              <Form.Group controlId="formTelefonoContatto">
                <Form.Label>Telefono Contatto</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedCliente.telefonoContatto}
                  onChange={(e) => setSelectedCliente({ ...selectedCliente, telefonoContatto: e.target.value })}
                />
              </Form.Group>

              <Form.Group controlId="formTipologia">
                <Form.Label>Tipologia</Form.Label>
                <Form.Control
                  as="select"
                  value={selectedCliente.tipologia}
                  onChange={(e) => setSelectedCliente({ ...selectedCliente, tipologia: e.target.value })}
                >
                  <option value="PA">PA</option>
                  <option value="SAS">SAS</option>
                  <option value="SPA">SPA</option>
                  <option value="SRL">SRL</option>
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="formIndirizzoSedeLegale">
                <Form.Label>Indirizzo Sede Legale</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedCliente.indirizzoSedeLegale}
                  onChange={(e) => setSelectedCliente({ ...selectedCliente, indirizzoSedeLegale: e.target.value })}
                />
              </Form.Group>

              <Form.Group controlId="formIndirizzoSedeOperativa">
                <Form.Label>Indirizzo Sede Operativa</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedCliente.indirizzoSedeOperativa}
                  onChange={(e) => setSelectedCliente({ ...selectedCliente, indirizzoSedeOperativa: e.target.value })}
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

      <Button variant="success" onClick={() => setShowCreateModal(true)}>
        Aggiungi Cliente
      </Button>

      <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Crea Nuovo Cliente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formRagioneSociale">
              <Form.Label>Ragione Sociale</Form.Label>
              <Form.Control
                type="text"
                value={newCliente.ragioneSociale}
                onChange={(e) => setNewCliente({ ...newCliente, ragioneSociale: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId="formPartitaIva">
              <Form.Label>Partita IVA</Form.Label>
              <Form.Control
                type="text"
                value={newCliente.partitaIva}
                onChange={(e) => setNewCliente({ ...newCliente, partitaIva: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={newCliente.email}
                onChange={(e) => setNewCliente({ ...newCliente, email: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId="formDataUltimoContatto">
              <Form.Label>Data Ultimo Contatto</Form.Label>
              <Form.Control
                type="date"
                value={newCliente.dataUltimoContatto}
                onChange={(e) => setNewCliente({ ...newCliente, dataUltimoContatto: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formPec">
              <Form.Label>PEC</Form.Label>
              <Form.Control
                type="text"
                value={newCliente.pec}
                onChange={(e) => setNewCliente({ ...newCliente, pec: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId="formTelefono">
              <Form.Label>Telefono</Form.Label>
              <Form.Control
                type="text"
                value={newCliente.telefono}
                onChange={(e) => setNewCliente({ ...newCliente, telefono: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId="formEmailContatto">
              <Form.Label>Email Contatto</Form.Label>
              <Form.Control
                type="email"
                value={newCliente.emailContatto}
                onChange={(e) => setNewCliente({ ...newCliente, emailContatto: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId="formNomeContatto">
              <Form.Label>Nome Contatto</Form.Label>
              <Form.Control
                type="text"
                value={newCliente.nomeContatto}
                onChange={(e) => setNewCliente({ ...newCliente, nomeContatto: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId="formCognomeContatto">
              <Form.Label>Cognome Contatto</Form.Label>
              <Form.Control
                type="text"
                value={newCliente.cognomeContatto}
                onChange={(e) => setNewCliente({ ...newCliente, cognomeContatto: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId="formTelefonoContatto">
              <Form.Label>Telefono Contatto</Form.Label>
              <Form.Control
                type="text"
                value={newCliente.telefonoContatto}
                onChange={(e) => setNewCliente({ ...newCliente, telefonoContatto: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId="formTipologia">
              <Form.Label>Tipologia</Form.Label>
              <Form.Control
                as="select"
                value={newCliente.tipologia}
                onChange={(e) => setNewCliente({ ...newCliente, tipologia: e.target.value })}
              >
                <option value="PA">PA</option>
                <option value="SAS">SAS</option>
                <option value="SPA">SPA</option>
                <option value="SRL">SRL</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formIndirizzoSedeLegale">
              <Form.Label>Indirizzo Sede Legale</Form.Label>
              <Form.Control
                type="text"
                value={newCliente.indirizzoSedeLegale}
                onChange={(e) => setNewCliente({ ...newCliente, indirizzoSedeLegale: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId="formIndirizzoSedeOperativa">
              <Form.Label>Indirizzo Sede Operativa</Form.Label>
              <Form.Control
                type="text"
                value={newCliente.indirizzoSedeOperativa}
                onChange={(e) => setNewCliente({ ...newCliente, indirizzoSedeOperativa: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCreateModal(false)}>
            Annulla
          </Button>
          <Button variant="primary" onClick={handleCreateCliente}>
            Crea Cliente
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminClientiPage;
