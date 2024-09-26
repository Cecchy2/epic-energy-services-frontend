import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const AdminHomePage = () => {
  const navigate = useNavigate();

  const fatturePage = () => {
    navigate("/adminfatturepage");
  };

  const clientiPage = () => {
    navigate("/adminClientiPage");
  };

  return (
    <div>
      <h1 className="mt-4 text-center">Pagina Gestione Amministratore</h1>
      <div>
        <h4 className="mt-5">Gestisci Fatture</h4>
        <Button variant="secondary" onClick={fatturePage}>
          Vai alla gestione delle fatture
        </Button>
      </div>
      <div>
        <h4 className="mt-5">Gestisci Clienti</h4>
        <Button variant="secondary" onClick={clientiPage}>
          Vai alla gestione dei clienti
        </Button>
      </div>
    </div>
  );
};

export default AdminHomePage;
