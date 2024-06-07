import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext/AuthContext";
import { CardVisualizzaPrevisioniMeteo } from "./CardVisualizzaPrevizioniMeteo";
import { CardBackground } from "./CardBackground";

// Stile per il background del testo
const textBackgroundStyle = {
    backgroundColor: 'rgba(255, 0, 0, 0.3)', // Colore di sfondo rosso con opacità del 30%
    padding: '10px', // Spaziatura interna
    borderRadius: '8px', // Bordo arrotondato
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', // Ombra del testo
};

// Componente CardHome utilizzato nella pagina HomePage
export function CardHome() {

    //Uso il contesto AuthContext per ottenere i dati dell'utente.
    const { user } = useContext(AuthContext);

    return (
        <CardBackground> {/* Utilizzo del componente CardBackground per impostare lo sfondo */}
            <div className="container mt-5 mb-5">
                {/* Titolo principale con stile di background personalizzato */}
                <h1 className="text-center mb-4 fw-bold text-danger-emphasis" style={textBackgroundStyle}>
                    Benvenuto nella pagina Home Page di <br />
                    {user && user.nome} {user && user.cognome} {/* Estraggo il nome e cognome dell'utente dal AuthContext*/}
                </h1>
                <CardVisualizzaPrevisioniMeteo /> {/* Utilizzo del componente per visualizzare le previsioni meteo già fatte di un determinato utente*/}
            </div>
        </CardBackground>
    );
}