package it.corso.dao;

import org.springframework.data.repository.CrudRepository;

import it.corso.model.Utente;

/**
 * Interfaccia per l'accesso ai dati degli utenti nel database.
 */

public interface UtenteDao extends CrudRepository<Utente, Integer>{
	
	/**
     * Query methods per verificare se esiste un utente nel database con l'email specificata.
     * @param email Email dell'utente da verificare.
     * @return true se l'utente esiste, false altrimenti.
     */
	boolean existsByEmail(String email);
	
	/**
     * Query methods per recuperare un utente dal database utilizzando l'email specificata.
     * @param email Email dell'utente da recuperare.
     * @return L'utente associato all'email specificata.
     */
	Utente findByEmail(String email);

	/**
     * Query methods per recuperare un utente dal database utilizzando l'email e la password che sono state specificate.
     * @param email Email dell'utente.
     * @param password Password dell'utente.
     * @return L'utente associato all'email e alla password specificate.
     */
	Utente findByEmailAndPassword(String email, String password);
}