import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="text-center mt-5">
      <h1>Benvenuto, sei già registrato?</h1>
      <p>Puoi scegliere di accedere al tuo account oppure registrarti.</p>

      <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
        {/* Pulsante per andare alla pagina di login */}
        <Link to="/login">
          <Button variant="primary">Login</Button>
        </Link>

        {/* Pulsante per andare alla pagina di registrazione */}
        <Link to="/register">
          <Button variant="secondary">Registrati</Button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
