import { AuthContext } from "./AuthContext";
import { useState, useEffect} from "react";
import { checkToken } from "../../services/RESTConfig";

// Provider del contesto di autenticazione per fornire i dati utente e lo stato del token ai componenti figli
export function AuthContextProvider({ children }) {

    // Stato per verificare se il token è valido, inizializzato con il risultato della funzione checkToken.
    const [tokenValid, setTokenValid] = useState(checkToken())

    // Stato per memorizzare i dati dell'utente, inizialmente vuoto.
    const [user, setUser] = useState({
        nome: "",
        cognome: "",
        email: "",
    });

    // Effetto per loggare lo stato dell'utente ogni volta che cambia.
    useEffect(() => {
        console.log("Stato utente aggiornato:", user);
    }, [user]);

    // Fornisco i dati utente e lo stato del token ai componenti figli attraverso il contesto.
    return (
        <AuthContext.Provider value={{ user, setUser, tokenValid, setTokenValid }}>
            {children}
        </AuthContext.Provider>
    );
}