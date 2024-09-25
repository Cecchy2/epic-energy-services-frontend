import React, { useEffect, useState } from "react";
import { Table, Button, Form, Row, Col, Alert } from "react-bootstrap";

const AdminFatturePage = () => {
  const [fatture, setFatture] = useState([]);
  const [selectedFattura, setSelectedFattura] = useState(null);
  const [newFattura, setNewFattura] = useState({
    // campi necessari per creare una nuova fattura
  });
  const [statoFattura, setStatoFattura] = useState("");
  const [filters, setFilters] = useState({
    clienteId: "",
    statoFattura: "",
    anno: "",
    minimoImporto: "",
    massimoImporto: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchFatture();
  }, []);

  const fetchFatture = async () => {
    try {
      const response = await fetch("http://localhost:3001/fatture");
      const data = await response.json();
      setFatture(data.content); // Assumendo che il server risponda con paginazione
    } catch (error) {
      setErrorMessage("Errore nel caricamento delle fatture");
    }
  };

  const createFattura = async () => {
    try {
      const response = await fetch("http://localhost:3001/fatture", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newFattura),
      });
      if (response.ok) {
        fetchFatture();
      } else {
        setErrorMessage("Errore nella creazione della fattura");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateFattura = async (fatturaId) => {
    try {
      const response = await fetch(`http://localhost:3001/fatture/${fatturaId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedFattura),
      });
      if (response.ok) {
        fetchFatture();
      }
    } catch (error) {
      setErrorMessage("Errore nell'aggiornamento della fattura");
    }
  };

  const deleteFattura = async (fatturaId) => {
    try {
      const response = await fetch(`http://localhost:3001/fatture/${fatturaId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        fetchFatture();
      }
    } catch (error) {
      setErrorMessage("Errore nell'eliminazione della fattura");
    }
  };

  const filterFatture = async () => {
    // implementa la logica per i vari filtri come cliente, anno, stato, ecc.
  };

  return (
    <div className="container mt-4">
      <h1>Gestione Fatture</h1>
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Cliente</th>
            <th>Stato</th>
            <th>Anno</th>
            <th>Importo</th>
            <th>Azioni</th>
          </tr>
        </thead>
        <tbody>
          {fatture.map((fattura) => (
            <tr key={fattura.id}>
              <td>{fattura.id}</td>
              <td>{fattura.cliente.nome}</td>
              <td>{fattura.stato}</td>
              <td>{fattura.anno}</td>
              <td>{fattura.importo}</td>
              <td>
                <Button variant="warning" onClick={() => setSelectedFattura(fattura)}>
                  Modifica
                </Button>
                <Button variant="danger" onClick={() => deleteFattura(fattura.id)} className="ml-2">
                  Elimina
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Form onSubmit={createFattura}>
        <Row>
          <Col>
            <Form.Group controlId="formCliente">
              <Form.Label>Cliente</Form.Label>
              <Form.Control
                type="text"
                value={newFattura.cliente || ""}
                onChange={(e) => setNewFattura({ ...newFattura, cliente: e.target.value })}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formImporto">
              <Form.Label>Importo</Form.Label>
              <Form.Control
                type="number"
                value={newFattura.importo || ""}
                onChange={(e) => setNewFattura({ ...newFattura, importo: e.target.value })}
              />
            </Form.Group>
          </Col>
        </Row>
        <Button type="submit" variant="primary" className="mt-3">
          Crea Fattura
        </Button>
      </Form>

      {/* Filtri */}
      <Form className="mt-4" onSubmit={filterFatture}>
        <Row>
          <Col>
            <Form.Group controlId="formAnno">
              <Form.Label>Anno</Form.Label>
              <Form.Control
                type="number"
                value={filters.anno}
                onChange={(e) => setFilters({ ...filters, anno: e.target.value })}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formStato">
              <Form.Label>Stato</Form.Label>
              <Form.Control
                as="select"
                value={filters.statoFattura}
                onChange={(e) => setFilters({ ...filters, statoFattura: e.target.value })}
              >
                <option value="">Seleziona</option>
                <option value="PAGATA">Pagata</option>
                <option value="NON_PAGATA">Non Pagata</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Button type="submit" variant="secondary" className="mt-3">
          Filtra Fatture
        </Button>
      </Form>
    </div>
  );
};

export default AdminFatturePage;
