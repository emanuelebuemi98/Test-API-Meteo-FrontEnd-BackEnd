package it.corso.controller;

import java.security.Key;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import it.corso.dto.UtenteLoginRequestDto;
import it.corso.dto.UtenteLoginResponseDto;
import it.corso.dto.UtenteRegistrazioneDto;
import it.corso.model.Utente;
import it.corso.service.BlackList;
import it.corso.service.UtenteService;
import jakarta.validation.Valid;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.container.ContainerRequestContext;
import jakarta.ws.rs.core.HttpHeaders;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

/**
 * Controller per la gestione delle operazioni relative agli utenti.
 */

@Path("/utente")
public class UtenteController {
	
	@Autowired
	private UtenteService utenteService; //Iniezione della dipendenza del servizio per la gestione dei metodi utente
	
	@Autowired
	private BlackList blacklist; //Iniezione della dipendenza del servizio che rendere invalido il token 
	
	// Metodo per gestire le risposte HTTP durante la registrazione di un nuovo utente
	@POST
	@Path("/reg")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response userRegistration(@Valid @RequestBody UtenteRegistrazioneDto utenteDto) {

		try {
			// Validazione della password usando una regex (se non rispetta la regex...)
			if (!Pattern.matches("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,20}", utenteDto.getPassword())) {
				return Response.status(Response.Status.BAD_REQUEST).build(); // ritorno una risposta con codice 400 - BAD_REQUEST (errore del client)
			}
			// Controllo se l'utente esiste già tramite la verifica dell'email
			if (utenteService.existsUtenteByEmail(utenteDto.getEmail())) {
				return Response.status(Response.Status.BAD_REQUEST).build(); // ritorno una risposta con codice 400 - BAD_REQUEST (errore del client)
			}
			//Se supera i due if...
			utenteService.utenteRegistration(utenteDto); // Avviene la registrazione dell'utente nel db
			return Response.status(Response.Status.OK).build(); // ritorno una risposta con codice 200 - OK (successo)

		} catch (Exception e) {
			// In caso di eccezione, ritorno una risposta con codice 500 (errore nel server)
			return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
		}
	}
	
	// Metodo per gestire le risposte HTTP durante la login di un utente 
	@POST
	@Path("/login")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response userLogin(@RequestBody UtenteLoginRequestDto utenteLoginDto) {

		try {
			// Se le credenziali sono corrette, ritorno OK e si genera un token JWT per l'utente e lo si restituisce nella risposta
			if (utenteService.loginUtente(utenteLoginDto)) {
				return Response.status(Response.Status.OK).entity(generateToken(utenteLoginDto.getEmail())).build();
			}
			 // Se il login fallisce...
			return Response.status(Response.Status.NOT_FOUND).build(); //ritorno una risposta con codice 404 - NOT_FOUND (risorsa non trovata)
		} catch (Exception e) {
			// In caso di eccezione, ritorno una risposta con codice 500 (errore nel server)
			return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
		}
	}

	// Metodo che genera un token JWT per l'utente in base all'email specificata
	private UtenteLoginResponseDto generateToken(String email) {

		// Eseguiamo una cifratura attraverso l'algoritmo di crittografia HMAC
		byte[] keySecret = "cusjshsvdthshaiana437882726bshsb2782ddd8282dw".getBytes();
		// Creiamo la chiave per la firma del token passandogli la chiave hashata
		Key key = Keys.hmacShaKeyFor(keySecret);
		
		//Ci prendiamo le informazione del singolo utente attraverso il servizio Utente
		Utente infoUtente = utenteService.getUtenteByEmail(email);

		// Creiamo una mappa contenente le informazioni dell'utente per il token JWT
		Map<String, Object> mappa = new HashMap<>();
		mappa.put("email", email);
		mappa.put("nome", infoUtente.getNome());
		mappa.put("cognome", infoUtente.getCognome());
		mappa.put("idUtente", infoUtente.getIdUtente());
		
		//Impostiamo la data di creazione e la scadenza del token (che ha un ttl con 15 minuti di validità)
		Date creazioneData = new Date();
		Date dataEnd = java.sql.Timestamp.valueOf(LocalDateTime.now().plusMinutes(15L));

		//Creiamo il token JWT firmato con la chiave segreta e impostando i dati specificati che sono:
		String jwtToken = Jwts.builder()
				.setClaims(mappa) // i claims (informazioni) del token
				.setIssuer("http//localhost:8080") // il mittente del token
				.setIssuedAt(creazioneData) // la data di creazione del token
				.setExpiration(dataEnd) // la data di scadenza del token
				.signWith(key) //la firma il token con la chiave segreta
				.compact(); // bisogna compattare tutto il token in una stringa

		//Creiamo un oggetto di tipo UtenteLoginResponseDto contenente il token e altre informazioni (data inizio e scadenza)
		UtenteLoginResponseDto token = new UtenteLoginResponseDto();
		token.setToken(jwtToken);
		token.setTtl(dataEnd);
		token.setTokenCreationTime(creazioneData);

		return token; 
	}
	
	// Metodo per gestire le risposte HTTP ed effettuare il logout di un utente
	@GET
	@Path("/logout")
	public Response userLogout (ContainerRequestContext requestContext) {
		try {
			
			// Ottengo il token dall'header di autorizzazione
			String autorizzazioneHeader = requestContext.getHeaderString(HttpHeaders.AUTHORIZATION);
			String token = autorizzazioneHeader.substring("Bearer".length()).trim();
		
			// Invalido il token aggiungendolo alla blacklist
			blacklist.invalidateToken(token);
			return Response.status(Response.Status.OK).build(); // ritorno una risposta con codice 200 - OK (successo)			
		} catch (Exception e) {
			// In caso di eccezione, ritorno una risposta con codice 500 (errore nel server)
			return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
		}
	}

}
