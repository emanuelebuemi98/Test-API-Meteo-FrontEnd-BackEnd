import { jwtDecode } from 'jwt-decode';

/* Funzione per registrare un utente. Invia una richiesta POST all'endpoint /api/utente/reg 
con i dati di registrazione forniti come parametro. Se la richiesta ha successo, restituisce 
i dati dell'utente registrato, altrimenti se fallisce, genera un'eccezione con il messaggio di errore.*/
export async function registerUser(datiRegistration) {
    try {
        // Vado prima a convertire i dati di registrazione in una stringa JSON
        const jsonBody1 = JSON.stringify(datiRegistration);
    
        //Effettuo la richiesta POST all'endpoint /api/utente/reg per registrare l'utente.
        const response = await fetch("http://localhost:8080/api/utente/reg", {
            mode: "cors", //abilita la richiesta cors
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: jsonBody1
        });
    
        console.log("Response:", response);
    
        //se la richiesta ha uno status 200 - OK
        if (response.ok) {
            const contentType = response.headers.get("Content-Type");
            if (contentType && contentType.includes("application/json")) {
                console.log("Registrazione avvenuta con successo");
                //otteniamo i dati della risposta e li restituimo
                const data = await response.json(); 
                return data;
            }
        } else {
            throw new Error('Registrazione fallita: dati inseriti non corretti');
        }
    } catch (error) {
        throw new Error(`Errore durante la registrazione: ${error.message}`);
    }
}

/* Funzione per effettuare la login di un utente Invia una richiesta POST all'endpoint /api/utente/login 
con le credenziali dell'utente fornite come parametro. Se le credenziali sono corrette e la richiesta 
ha successo, restituisce i dati dell'utente autenticato. altrimenti se le credenziali sono errate o 
la richiesta fallisce, genera un'eccezione con il messaggio di errore.*/
export async function loginUser(credentials) {
    try {
        // Vado prima a convertire i dati relative alle credenziali in una stringa JSON
        const jsonBody2 = JSON.stringify(credentials);

        // Effettuo la richiesta POST all'endpoint /api/utente/login per fare il login
        const response = await fetch("http://localhost:8080/api/utente/login", {
            mode: "cors",
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: jsonBody2
        });

        //se la richiesta ha uno status 200 - OK
        if (response.ok) {
            //otteniamo i dati della risposta e li restituimo
            const userData = await response.json();
            return userData;
        } else {
            throw new Error('Login fallito: credenziali errate');
        }
    } catch (error) {
        throw new Error(`Errore durante la login: ${error.message}`);
    }
}

/* Funzione per ottenere i dati meteo di una determinata città. Utilizza l'API di OpenWeatherMap 
per ottenere i dati meteo corrispondenti alla città specificata. Restituisce i dati meteo se la 
richiesta ha successo, altrimenti se la richiesta fallisce, genera un'eccezione con il messaggio di errore. */
export async function getMeteo(citta) {
    try {
        const apiKey = "c4ebcf4f66a3de87d3e6075b88c0f76c"; // Chiave API per OpenWeatherMap
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${citta}&appid=${apiKey}&units=metric`; //api che ricerca le previsioni in base alla citta inserita

        // Effettuo la richiesta GET all'endpoint  per ottenere i dati meteo della citta richiesta
        const response = await fetch(apiUrl);

        //se la richiesta ha uno status 200 - OK
        if (response.ok) {
            //otteniamo i dati della risposta e li restituimo
            const datiMeteo = await response.json();
            return datiMeteo;
        } 
    } catch (error) {
        throw new Error(`Errore durante la richiesta dei dati meteorologici: ${error.message}`);
    }
}

/* Funzione per salvare i dati meteo sul backend. Riceve come parametro i dati meteo da salvare e il 
token JWT dell'utente autenticato. Decodifica il token per ottenere l'ID dell'utente e include 
(oltre i dati relativi alle previsioni) anche l'ID nell'oggetto dei dati meteo prima di inviare 
la richiesta POST all'endpoint con i dati meteo e il token di autenticazione. 
Se la richiesta ha successo, restituisce la risposta, altrimenti, genera un'eccezione con il messaggio di errore.*/
export async function salvaDatiMeteo(datiMeteo, token) {
    try {
        // Decodifica il token per ottenere l'ID dell'utente
        const decodedToken = jwtDecode(token);
        console.log("Decodifica Token:", decodedToken);
        const idUtente = decodedToken.idUtente;
        console.log("ID Utente:", idUtente);

         // Effettuo la richiesta POST all'endpoint /api/meteo/salva per salvare i dati meteo
        const response = await fetch('http://localhost:8080/api/meteo/salva', {
            mode: "cors",
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Aggiungo il token JWT nell'header di autorizzazione
            },
            body: JSON.stringify({
                "citta": datiMeteo.name,
                "temperatura": datiMeteo.main.temp,
                "umidita": datiMeteo.main.humidity,
                "descrizione": datiMeteo.weather[0].description,
                "velocita": datiMeteo.wind.speed,
                "utente_id": idUtente,
            }),
        });

        //se la richiesta ha uno status 200 - OK
        if (response.ok) {
            console.log("Salvataggio dati meteo avvenuto con successo");
            return response; // Restituiamo la risposta
        } 
    } catch (error) {
        console.error("Errore durante il salvataggio dei dati meteo:", error.message);
        throw error;
    }
}

/* Funzione per recuperare i dati meteo dell'utente autenticato. Decodifica il token per ottenere l'ID 
dell'utente e invia una richiesta GET all'endpoint con l'ID utente e il token di autenticazione. 
Se la richiesta ha successo, restituisce i dati meteo dell'utente, altrimenti, genera un'eccezione 
con il messaggio di errore.*/
export async function getDatiMeteoUtente(token) {
    try {
        //Decodifica il token per ottenere l'ID dell'utente.
        const decodedToken = jwtDecode(token);
        console.log("Decodifica Token:", decodedToken);
        const idUtente = decodedToken.idUtente;
        console.log("ID Utente:", idUtente);

        //Effettua una richiesta GET all'endpoint /api/meteo/utente con l'ID utente e il token per autenticazione.
        const response = await fetch(`http://localhost:8080/api/meteo/utente?userId=${idUtente}`, {
            mode: "cors",
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        //se la richiesta ha uno status 200 - OK
        if (response.ok) {
             //otteniamo i dati della risposta e li restituimo
            const datiMeteo = await response.json();
            return datiMeteo;
        } 
    } catch (error) {
        console.error("Errore durante il recupero dei dati meteo:", error.message);
        throw error;
    }
}