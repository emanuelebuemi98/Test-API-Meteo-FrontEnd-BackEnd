import { NavLink, useNavigate } from "react-router-dom"
import { useContext } from "react"
import Cookies from "js-cookie";
import { AuthContext } from "../../contexts/AuthContext/AuthContext";

// Componente Navbar del sito che gestisce il logout e fornisce i link di navigazione (utilizzato dentro MainLayout)
export function Navbar() {

    // Context di autenticazione per ottenere e settare le informazioni sull'utente
    const { user, setUser } = useContext(AuthContext);

    // Context di autenticazione per settare la validita del token
    const { setTokenValid } = useContext(AuthContext)

    // Hook di react-router-dom per la navigazione tra le pagine.
    const navigate = useNavigate();

    // Funzione per gestire il logout dell'utente.
    const handleLogout = () => {
        setTokenValid(false); // Imposto il token come non valido
        Cookies.remove('token'); // Rimuovo il token dal cookie.
        // Azzero lo stato dell'utente
        setUser({
            nome: "",
            cognome: "",
            email: "",
        });
        navigate("/"); //Infine reindirizzo l'utente alla pagina di accesso.
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark" to="/">
                <div className="container-fluid">
                    <div className="navbar-brand text-warning">
                        <i className="bi bi-person-circle me-2"></i>
                        {user.nome} {user.cognome}
                    </div>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/home">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/meteo">Meteo</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/" onClick={handleLogout}>Logout</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )

}