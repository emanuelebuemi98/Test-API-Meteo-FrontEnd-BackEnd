import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { checkToken } from "../services/RESTConfig";

// Componente che protegge una rotta assicurandosi che l'utente sia autenticato (Utilizzato nel Routes)
export function ProtectedRoute({ children }) {

    // Definisco un Hook di react-router-dom per navigare
    const navigateTo = useNavigate();

    // Effetto che controlla se l'utente è autenticato per l'accesso a una rotta specifica.
    useEffect(() => {
         // Verifico se il token di autenticazione è valido.
        if (!checkToken()) {
            navigateTo("/");  //se il token non è valido, reindirizza l'utente alla pagina di accesso.
        }
    }, [navigateTo]);

    // Se il token è valido, restituisce i componenti figli passati al ProtectedRoute.
    return <>{children}</>;

}