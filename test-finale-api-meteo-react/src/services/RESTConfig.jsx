import {jwtDecode} from "jwt-decode"; 
import Cookies from "js-cookie";

//Funzione che verifica se il token JWT memorizzato nei cookie è valido.
export function checkToken() {

    // Recupero il token memorizzato nei cookie del browser
    const token = Cookies.get("token");

    // Se non è presente un token, restituisce false
    if (!token) {
        return false;
    }

    try {
        // Decodifico il token JWT per ottenere le informazioni al suo interno
        const decodedToken = jwtDecode(token);
        // Ottengo il tempo di scadenza e il tempo corrente del token decodificato
        const currentTime = decodedToken.iat; // tempo corrente 
        const deadlineTime = decodedToken.exp; // tempo di scadenza --> 15 minuti
        
        // Verifico che il token sia ancora valido
        if (currentTime < deadlineTime) {
            return true;
        } else {
            return false;
        }

    } catch (error) {
        console.error("Errore durante la decodifica del token:", error);
        return false; 
    }
}