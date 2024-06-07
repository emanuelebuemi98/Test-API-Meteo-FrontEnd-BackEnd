package it.corso.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

/**
 * Classe di rappresentazione dell'entità DatiMeteo.
 * Mappata sulla tabella "datimeteo" del database.
 */

@Entity // Indica che la classe è una entità JPA che deve essere mappata in una tabella nel database.
@Table(name = "datimeteo") // Specifica il nome della tabella nel database a cui l'entità è mappata
public class DatiMeteo {
	
	/**
    * Chiave primaria per la tabella "datimeteo".
    */
	@Id //Indica che questo campo rappresenta la chiave primaria
	@GeneratedValue(strategy = GenerationType.IDENTITY) // Indica che il valore della chiave primaria sarà generato automaticamente
	@Column(name = "ID_m")  // Specifica il nome della colonna
	private int idMeteo;

	/**
     * Città di riferimento per i dati meteo.
     */
	@Column(name = "citta")
	private String citta;

	/**
     * Temperatura rilevata.
     */
	@Column(name = "temperatura")
	private double temperatura;

	/**
     * Umidità rilevata.
     */
	@Column(name = "umidita")
	private int umidita;
	
	/**
     * Descrizione delle condizioni meteo.
     */
	@Column(name = "descrizione")
	private String descrizione;

	/**
     * Velocità del vento rilevata.
     */
	@Column(name = "velocita_vento")
	private Double velocita;

	/**
     * Utente associato ai dati meteo.
     * Relazione molti-a-uno con la classe Utente.
     */
	@ManyToOne // Relazione molti-a-uno con la classe Utente
	@JoinColumn(name = "utente_id", referencedColumnName = "ID_u") // Definisce la colonna di join nel database --> la colonna utente_id di DatiMeteo è chiave esterna che si referenzia alla colonna ID_u che è chiave primaria di Utente
	private Utente utente;

	/**
     * Restituisce l'ID dei dati meteo.
     * @return idMeteo
     */
	public int getIdMeteo() {
		return idMeteo;
	}

	/**
     * Imposta l'ID dei dati meteo.
     * @param idMeteo ID da impostare
     */
	public void setIdMeteo(int idMeteo) {
		this.idMeteo = idMeteo;
	}

	/**
     * Restituisce la città di riferimento per i dati meteo.
     * @return citta
     */
	public String getCitta() {
		return citta;
	}

	/**
     * Imposta la città di riferimento per i dati meteo.
     * @param citta Città da impostare
     */
	public void setCitta(String citta) {
		this.citta = citta;
	}

	/**
     * Restituisce la temperatura rilevata.
     * @return temperatura
     */
	public double getTemperatura() {
		return temperatura;
	}

	/**
     * Imposta la temperatura rilevata.
     * @param temperatura Temperatura da impostare
     */
	public void setTemperatura(double temperatura) {
		this.temperatura = temperatura;
	}

	/**
     * Restituisce l'umidità rilevata.
     * @return umidita
     */
	public int getUmidita() {
		return umidita;
	}

	/**
     * Imposta l'umidità rilevata.
     * @param umidita Umidità da impostare
     */
	public void setUmidita(int umidita) {
		this.umidita = umidita;
	}

    /**
     * Restituisce la descrizione delle condizioni meteo.
     * @return descrizione
     */
    public String getDescrizione() {
        return descrizione;
    }

    /**
     * Imposta la descrizione delle condizioni meteo.
     * @param descrizione Descrizione da impostare
     */
    public void setDescrizione(String descrizione) {
        this.descrizione = descrizione;
    }

    /**
     * Restituisce la velocità del vento rilevata.
     * @return velocita
     */
    public Double getVelocita() {
        return velocita;
    }

    /**
     * Imposta la velocità del vento rilevata.
     * @param velocita Velocità del vento da impostare
     */
    public void setVelocita(Double velocita) {
        this.velocita = velocita;
    }

    /**
     * Restituisce l'utente associato ai dati meteo.
     * @return utente
     */
    public Utente getUtente() {
        return utente;
    }

    /**
     * Imposta l'utente associato ai dati meteo.
     * @param utente Utente da associare
     */
    public void setUtente(Utente utente) {
        this.utente = utente;
    }
}
