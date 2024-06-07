package it.corso.service;

import org.apache.commons.codec.digest.DigestUtils;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import it.corso.dao.UtenteDao;
import it.corso.dto.UtenteLoginRequestDto;
import it.corso.dto.UtenteRegistrazioneDto;
import it.corso.model.Utente;

/**
 * Implementazione dei servizi relativi agli utenti definiti nell'interfaccia UtenteService.
 */

@Service
public class UtenteServiceImpl implements UtenteService {
	
	@Autowired
	private UtenteDao utenteDao; //Dipendenza iniettata di UtenteDao per operazioni di persistenza con DB
	
	private ModelMapper mapper = new ModelMapper();
	
	//Metodo che regista un nuovo utente nel sistema
	@Override
	public void utenteRegistration(UtenteRegistrazioneDto registrazioneUtenteDto) {
		Utente utente = new Utente(); //Creazione di un oggetto utente
		// senza utilizzo del Modelmapper dovrei mappare manualmente i campi da datiMeteoDTO a datiMeteo
		/* utente.setNome(registrazioneUtenteDto.getNome());
		utente.setCognome(registrazioneUtenteDto.getCognome());
		utente.setEmail(registrazioneUtenteDto.getEmail());*/
		// Usando il model mapper mappo i dati del DTO della registrazione impostandoli all'entità Utente 
		utente = mapper.map(registrazioneUtenteDto, Utente.class);
		//Creazione di una password hashata con SHA-256 dalla password fornita durante la registrazione
		String passHash = DigestUtils.sha256Hex(registrazioneUtenteDto.getPassword());
        utente.setPassword(passHash);
        
        // Salvataggio del nuovo utente nel database
        utenteDao.save(utente);
	}
	
	//Metodo che verifica se un utente esiste nel sistema tramite la sua email
	@Override
	public boolean existsUtenteByEmail(String email) {
		// Richiamo il metodo del DAO per verificare esistenza di un utente con quella mail
		return utenteDao.existsByEmail(email); 
	}
	
	//Metodo per effettuare la login di un utente
	@Override
	public boolean loginUtente(UtenteLoginRequestDto utenteLoginDto) {
		Utente utente = new Utente(); //Creazione di un oggetto utente
		
		// Imposto l'email e la password dell'oggetto Utente dai dati del DTO
		/*utente.setEmail(utenteLoginDto.getEmail());
		utente.setPassword(utenteLoginDto.getPassword());*/
		
		// Usando il model mapper mappo i dati del DTO del login impostandoli all'entità Utente 
		utente = mapper.map(utenteLoginDto, Utente.class);
		// Creo una password hashata con SHA-256 della password fornita
		String passHash = DigestUtils.sha256Hex(utente.getPassword());
		// Cerco un utente nel database con l'email e la password hashata
		Utente credenzialiUtente = utenteDao.findByEmailAndPassword(utente.getEmail(), passHash); // Richiamo il metodo del DAO per ricercare le credenziali inserite
		
		//Restituisco l'esito della ricerca: credenziali corrette return true, credenziali non corrette return false
		return credenzialiUtente != null ? true : false;
	}
	
	//Metodo che estare un utente in base alla sua mail
	@Override
	public Utente getUtenteByEmail(String email) {
		// Richiamo il metodo del DAO per recuperare un utente con quella mail fornita
		return utenteDao.findByEmail(email); 
	}
	

}
