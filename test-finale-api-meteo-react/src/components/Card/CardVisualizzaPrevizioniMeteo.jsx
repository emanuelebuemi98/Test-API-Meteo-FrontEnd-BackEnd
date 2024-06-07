import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext/AuthContext";
import { getDatiMeteoUtente } from "../../services/RESTService";
import Cookies from "js-cookie";

// Componente CardVisualizzaPrevisioniMeteo per visualizzare le previsioni fatte di ogni singolo utente contenuto dentro CardHome
export function CardVisualizzaPrevisioniMeteo() {
    //Uso il contesto AuthContext per ottenere i dati dell'utente.
    const { user } = useContext(AuthContext);
    //Stato per memorizzare i dati meteo recuperati.
    const [datiMeteo, setDatiMeteo] = useState([]);

    //Usa useEffect per richiamare l'API e aggiornare lo stato datiMeteo quando l'utente è disponibile.
    useEffect(() => {
        if (user) {
            fetchDatiMeteo();
        }
    }, [user]);

    // Funzione per recuperare i dati meteo dell'utente.
    const fetchDatiMeteo = async () => {
        try {
            // Recupero il token dal cookie.
            const token = Cookies.get('token');
            if (token) {
                // Richiamo il servizio REST per ottenere i dati meteo dell'utente.
                const datiMeteo = await getDatiMeteoUtente(token);
                setDatiMeteo(datiMeteo); // Aggiorno lo stato dei datiMeteo con i dati ottenuti
            }
        } catch (error) {
            console.error("Errore nel recupero dei dati meteo:", error)
        }
    };

    return (
        <div className="row justify-content-center">
            {/* Visualizzo i dati meteo in una serie di card. */}
            {datiMeteo.length > 0 ? (
                // Se ci sono dati meteo disponibili, mappo ogni elemento e creo una card per ogni previsione
                datiMeteo.map((meteo, index) => (
                    <div key={index} className="col-md-4">
                        <div className="card mb-4">
                            <div className="card-body">
                                {/* Titolo della card con il nome della città */}
                                <h5 className="card-title card-center">{meteo.citta}</h5>
                                {/* Informazioni meteo all'interno della card */}
                                <p className="card-text">Temperatura: {meteo.temperatura}°C</p>
                                <p className="card-text">Umidità: {meteo.umidita}%</p>
                                <p className="card-text">Descrizione: {meteo.descrizione}</p>
                                <p className="card-text">Velocità del vento: {meteo.velocita} m/s</p>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                // Se non ci sono dati meteo disponibili, visualizza un messaggio di avviso
                <div className="col-md-12">
                    <p className="text-center">Nessuna ricerca meteo effettuata dall utente {user && user.email}</p>
                </div>
            )}
        </div>
    );
}