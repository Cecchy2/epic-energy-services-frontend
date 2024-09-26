import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const AdminHomePage = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/adminfatturepage");
  };

  return (
    <div>
      <h1 className="mt-4 text-center">Pagina Gestione Amministratore</h1>
      <h4 className="mt-5">Gestisci Fatture</h4>

      <Button variant="primary" onClick={handleNavigate}>
        Vai alla gestione delle fatture
      </Button>
    </div>
  );
};

export default AdminHomePage;
