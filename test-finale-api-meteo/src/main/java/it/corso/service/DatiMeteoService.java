package it.corso.service;

import java.util.List;

import it.corso.dto.DatiMeteoDto;

/**
 * Interfaccia per definire i servizi relativi ai dati meteo.
 */

public interface DatiMeteoService {
	
	/**
     * Salva i dati meteo forniti nel sistema utilizzando le informazioni fornite nel DTO.
     * @param datiMeteoDto DTO contenente i dettagli dei dati meteo da salvare.
     */
	void salvaDatiMeteo(DatiMeteoDto datiMeteoDto);
	
	/**
     * Recupera i dati meteo associati ad un utente specifico tramite l'ID 
     * dell'utente e restituisce una lista di DTO con i dati meteo.
     * @param utenteId ID dell'utente.
     * @return Lista di DTO contenente i dati meteo dell'utente.
     */
	List<DatiMeteoDto> getDatiMeteoUtente(int utenteId);
}
