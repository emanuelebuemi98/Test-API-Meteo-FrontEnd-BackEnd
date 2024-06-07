package it.corso.service;

import it.corso.dto.UtenteLoginRequestDto;
import it.corso.dto.UtenteRegistrazioneDto;
import it.corso.model.Utente;

/**
 * Interfaccia per definire i servizi relativi agli utenti.
 */

public interface UtenteService {
	
	/**
     * Registra un nuovo utente nel sistema utilizzando le informazioni fornite nel DTO.
     * @param registrazioneUtenteDto DTO contenente i dettagli dell'utente da registrare.
     */
	 void utenteRegistration(UtenteRegistrazioneDto registrazioneUtenteDto); 
	 
	 /**
	  * Verifica se un utente esiste nel sistema tramite la sua email fornita.
	  * @param email Email dell'utente.
	  * @return true se l'utente esiste, false altrimenti.
	  */
	 boolean existsUtenteByEmail(String email); 
	 
	 /**
	 * Effettua il login di un utente utilizzando le informazioni fornite nel DTO.
	 * @param utenteLoginDto DTO contenente i dettagli del login dell'utente.
	 * @return true se le credenziali sono corrette, false altrimenti.
	 */
	 boolean loginUtente(UtenteLoginRequestDto utenteLoginDto);
	 
	 /**
	 * Recupera un utente tramite la sua email specificata.
	 * @param email Email dell'utente.
	 * @return L'utente associato all'email fornita.
	 */	 
	 Utente getUtenteByEmail(String email);

}
