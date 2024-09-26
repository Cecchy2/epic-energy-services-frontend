import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";

const AdminFatturePage = () => {
  const [fatture, setFatture] = useState([]);

  const fetchFatture = async () => {
    try {
      const token = localStorage.getItem("authToken");
      console.log("Token " + token);
      const resp = await fetch("http://localhost:3001/fatture", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (resp.ok) {
        const data = await resp.json();
        console.log(data);
        setFatture(data);
      } else {
        throw new Error("Errore nel recupero delle fatture");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchFatture();
  }, []);

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Numero Fatture</th>
            <th>Cliente</th>
            <th>Stato</th>
            <th>Data Fattura</th>
            <th>Importo</th>
            <th>Azioni</th>
          </tr>
        </thead>
        <tbody>
          {fatture.content.length > 0 ? (
            fatture.content.map((fattura) => (
              <tr key={fattura.id}>
                <td>{fattura.id}</td>
                <td>{fattura.numeroFattura}</td>
                <td>{fattura.clienteId}</td>
                <td>{fattura.statoFattura}</td>
                <td>{fattura.dataFattura}</td>
                <td>{fattura.importo}</td>
                <td>
                  <button>Modifica</button>
                  <button>Elimina</button>
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
    </div>
  );
};

export default AdminFatturePage;
