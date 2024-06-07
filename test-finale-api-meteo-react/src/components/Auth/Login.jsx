import { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { loginUser } from "../../services/RESTService";
import { AuthContext } from "../../contexts/AuthContext/AuthContext";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

// Componente Login che gestiste l'autenticazione di un utente utilizzato nella pagina LoginPage
export function Login() {

    // Stato per gestire i dati del modulo di login
    const [formLogin, setFormLogin] = useState({
        email: "",
        password: ""
    });

    // Stato per mostrare o nascondere l'alert di login avvenuto con successo
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);

    // Stato per mostrare o nascondere l'alert di errore di credenziali sbagliate
    const [showErrorAlert, setShowErrorAlert] = useState(false);

    //Hook per la gestione della cronologia dei percorsi
    const navigate = useNavigate();

    //Mi prendo la funzione setUser dal contesto dell'autenticazione
    const { setUser, setTokenValid } = useContext(AuthContext);

    // Funzione per gestire i cambiamenti negli input del modulo di login
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormLogin({ ...formLogin, [name]: value });
    }

    // Funzione per gestire l'invio del modulo di login
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.table(formLogin);

        try {
            // Chiamata alla funzione loginUser per autenticare l'utente
            const userDataLogin = await loginUser(formLogin);
            console.log("Utente Login:", userDataLogin);
            // Se il login ha successo, decodifica il token JWT e imposta i dati dell'utente nel contesto
            if (userDataLogin) {

                //Decoficica del token JWT
                const decodedToken = jwtDecode(userDataLogin.token);
                console.log("Decodifica Token:", decodedToken);

                // Salvataggio del token nei cookie
                Cookies.set("token", userDataLogin.token);

                // Settaggio dei dati dell'utente nel contesto
                setUser({
                    nome: decodedToken.nome,
                    cognome: decodedToken.cognome,
                    email: decodedToken.email,
                });

                setShowSuccessAlert(true);  // Mostro l'alert di successo
                setTokenValid(true); //Imposto il token valido

                // Dopo 1 secondo, mi reindirizza l'utente alla pagina home
                setTimeout(() => {
                    navigate('/home');
                }, 1000);
            }
        } catch (error) {
            console.error("Errore durante il login:", error.message);
            setShowErrorAlert(true);
        }

        // Azzero i campi del modulo di login 
        setFormLogin({
            email: "",
            password: ""
        });
    };

    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h1 className="text-center mb-4 fw-bold text-success">Login</h1>
                            {/* Visualizzazione dell'alert di successo se showSuccessAlert è true */}
                            {showSuccessAlert && (
                                <div className="alert alert-success" role="alert">
                                    Login avvenuto con successo!
                                </div>
                            )}
                             {/* Visualizzazione dell'alert di errore se showErrorAlert è true */}
                            {showErrorAlert && (
                                <div className="alert alert-danger" role="alert">
                                    Credenziali non valide. Si prega di riprovare.
                                </div>
                            )}
                            {/* Form per l'inserimento delle credenziali di login */}
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input type="email" name="email" className="form-control" id="email" value={formLogin.email} onChange={handleChange} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input type="password" name="password" className="form-control" id="password" value={formLogin.password} onChange={handleChange} required />
                                </div>
                                <div className="d-grid gap-2">
                                    <button type="submit" className="btn btn-primary">Accedi</button>
                                    <p className="text-center mt-2">
                                        Non sei ancora registrato? {" "}
                                        <NavLink to="/register" className="text-secondary">REGISTRATI</NavLink>
                                    </p>
                                    <p className="text-center mt-2">
                                        Torna alla pagina iniziale. {" "}
                                        <NavLink to="/" className="text-secondary">ACCESSO</NavLink>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}