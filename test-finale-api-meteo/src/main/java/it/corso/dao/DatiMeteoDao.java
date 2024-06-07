package it.corso.dao;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import it.corso.model.DatiMeteo;

/**
 * Interfaccia per l'accesso ai dati meteo nel database.
 */

public interface DatiMeteoDao extends CrudRepository<DatiMeteo, Integer> {

	/**
     * Query personalizzata che mi recupera la lista di dati meteo associati a un utente specifico dal database.
     * @param utenteId ID dell'utente.
     * @return Lista di dati meteo associati all'utente specificato.
     */
	@Query("SELECT dm FROM DatiMeteo dm WHERE dm.utente.id = :utenteId")
	List<DatiMeteo> findByUtenteId(@Param("utenteId") int utenteId);
	
	//Nota! Potevo usare il metodo generato automaticamente per eseguire la query...tuttavia non mi funzionava e ho dovuto usare una query personalizzata
	//List<DatiMeteo> findByUtenteId(int utenteId);

}