import { useState, useEffect } from 'react';
import { getMeteo, salvaDatiMeteo } from '../../services/RESTService';
import Cookies from "js-cookie";
import { CardCarosello } from './CardCarosello';

// Stile per il background del testo
const textBackgroundStyle = {
    backgroundColor: 'rgba(255, 0, 0, 0.2)', // Colore di sfondo rosso con opacità del 20%
    padding: '10px', // Spaziatura interna
    borderRadius: '8px', // Bordo arrotondato
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', // Ombra del testo
};

//Componente CardRicercaMeteo utilizzato nella pagina MeteoPage
export function CardRicercaMeteo() {

    // Ottengo il token dai cookie
    const token = Cookies.get("token");

    // Stato per gestire la città inserita dall'utente
    const [citta, setCitta] = useState('');

    // Stato per recuperare i dati meteo ottenuti dall'API
    const [datiMeteo, setDatiMeteo] = useState(null);

    // Funzione che gestisce il cambiamento di input della città
    const handleChange = (e) => {
        setCitta(e.target.value);
    };

    // Effettuo il salvataggio dei dati meteo ogni volta che i dati meteo cambiano
    useEffect(() => {
        if (datiMeteo) {
            salvaDatiMeteo(datiMeteo, token)
        }
    }, [datiMeteo]);

    // Funzione che gestisce l'invio del modulo e richiede i dati meteo dall'API
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const dati = await getMeteo(citta); // Chiamata all'API per ottenere i dati meteo della città
            setDatiMeteo(dati); // Aggiornamento dello stato con i dati meteo ottenuti
        } catch (error) {
            console.error('Errore durante la richiesta dei dati meteo:', error.message);
        }
    };

    return (
        <div className="container mt-5 mb-5">
            {/* Titolo principale con stile di background personalizzato */}
            <h1 className="text-center mb-4 fw-bold text-danger-emphasis" style={textBackgroundStyle}>
                Previsioni Meteo
            </h1>
            <div className="row justify-content-center">
                <div className="col-md-6">
                    {/* Form per l'inserimento della città e la richiesta dei dati meteo */}
                    <form onSubmit={handleSubmit}>
                        <div className="input-group mb-3">
                            {/* Campo di testo per l'inserimento del nome della città */}
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Inserisci il nome della città"
                                value={citta}
                                onChange={handleChange}
                            />
                            {/* Pulsante per inviare il form e cercare i dati meteo */}
                            <button className="btn btn-primary" type="submit">
                                Cerca
                            </button>
                        </div>
                    </form>
                    {/* Se i dati meteo sono disponibili, visualizza i risulati estrapolati dall'API */}
                    {datiMeteo && (
                        <div className="card mt-3">
                            <div className="card-body">
                                <h3 className="card-title">Dati meteo per la città: "{datiMeteo.name}"</h3>
                                <p className="card-text">Temperatura: {datiMeteo.main.temp}°C</p>
                                <p className="card-text">Umidità: {datiMeteo.main.humidity}%</p>
                                <p className="card-text">Descrizione: {datiMeteo.weather[0].description}</p>
                                <p className="card-text">Velocità del vento: {datiMeteo.wind.speed} m/s</p>
                            </div>
                        </div>
                    )}
                    {/* Aggiunta del carosello di immagini */}
                    <CardCarosello/>
                </div>
            </div>
        </div>
    );
}