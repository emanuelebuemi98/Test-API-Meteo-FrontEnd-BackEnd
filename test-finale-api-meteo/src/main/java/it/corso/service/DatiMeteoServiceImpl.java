package it.corso.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import it.corso.dao.DatiMeteoDao;
import it.corso.dao.UtenteDao;
import it.corso.dto.DatiMeteoDto;
import it.corso.model.DatiMeteo;
import it.corso.model.Utente;

/**
 * Implementazione dei servizi relativi ai dati meteo definiti nell'interfaccia
 * DatiMeteoService.
 */

@Service
public class DatiMeteoServiceImpl implements DatiMeteoService {

	@Autowired
	private DatiMeteoDao datiMeteoDao; // Dipendenza iniettata di DatiMeteoDao per operazioni di persistenza con DB

	@Autowired
	private UtenteDao utenteDao; // Dipendenza iniettata di UtenteDao per operazioni di persistenza con DB

	// Definisco un'stanza di ModelMapper per la mappatura automatica dei dati tra l'oggetto DTO e l'entità (classe) del modello
	private ModelMapper mapper = new ModelMapper();

	// Metodo per salvare i dati meteo estrapolati
	@Override
	public void salvaDatiMeteo(DatiMeteoDto datiMeteoDto) {
		// Recupero l'utente dal database utilizzando l'ID fornito nel DTO
		Optional<Utente> utenteOptional = utenteDao.findById(datiMeteoDto.getUtente_id());
		DatiMeteo datiMeteo = new DatiMeteo();

		// Verifico se l'utente esiste: se esiste...
		if (utenteOptional.isPresent()) {
			Utente utente = utenteOptional.get(); // Recupero l'oggetto utente da utenteOptional
			/*
			 * //Senza l'uso del Modelmapper dovrei mappare manualmente i campi da datiMeteoDTO a datiMeteo
			 * datiMeteo.setCitta(datiMeteoDto.getCitta());
			 * datiMeteo.setTemperatura(datiMeteoDto.getTemperatura());
			 * datiMeteo.setUmidita(datiMeteoDto.getUmidita());
			 * datiMeteo.setDescrizione(datiMeteoDto.getDescrizione());
			 * datiMeteo.setVelocita(datiMeteoDto.getVelocita()); //Usando il model mapper diventa:
			 */
			// Mappo i dati dal DTO all'entità DatiMeteo utilizzando il modelmapper
			datiMeteo = mapper.map(datiMeteoDto, DatiMeteo.class);
			// e vado ad associarli all'utente
			datiMeteo.setUtente(utente); 
		}

		// Salvo i dati meteo nel database
		datiMeteoDao.save(datiMeteo);
	}

	// Metodo per recuperare i dati meteo dei singoli utenti
	@Override
	public List<DatiMeteoDto> getDatiMeteoUtente(int utenteId) {
		// Recupero la lista dei dati meteo associati ad un utente specifico dal db.
		List<DatiMeteo> datiMeteoList = datiMeteoDao.findByUtenteId(utenteId);
		List<DatiMeteoDto> datiMeteoDtoList = new ArrayList<>();

		// Per ogni dato presente nella lista dei dati meteo...
		for (DatiMeteo dato : datiMeteoList) {
			/*
			 * //Senza l'uso di ModelMapper, dovrei mappare manualmente i campi da DatiMeteo a DatiMeteoDto 
			 * DatiMeteoDto datiMeteoDto = new DatiMeteoDto();
			 * // Mappo manualmente i campi dall'entità DatiMeteo al DTO
			 * datiMeteoDto.setCitta(dato.getCitta());
			 * datiMeteoDto.setTemperatura(dato.getTemperatura());
			 * datiMeteoDto.setUmidita(dato.getUmidita());
			 * datiMeteoDto.setDescrizione(dato.getDescrizione());
			 * datiMeteoDto.setVelocita(dato.getVelocita());
			 */
			// Mappo ciascun dato dell'entità DatiMeteo al DTO utilizzando il modelmapper
			DatiMeteoDto datoMeteoDto = mapper.map(dato, DatiMeteoDto.class);
			// Imposto l'ID dell'utente nel DTO.
			datoMeteoDto.setUtente_id(utenteId); // oppure posso passare id dell'utente dall'oggetto di tipo Utente in DatiMeteo (cioè da getUtente()): dato.getUtente().getIdUtente()
			// e vado ad aggiungerli alla lista di DTO
			datiMeteoDtoList.add(datoMeteoDto); 
		}

		// Restituisco la lista di DTO dei dati meteo.
		return datiMeteoDtoList;
	}
}