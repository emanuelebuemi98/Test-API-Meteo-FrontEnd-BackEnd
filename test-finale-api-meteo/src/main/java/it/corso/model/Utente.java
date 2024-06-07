package it.corso.model;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

/**
 * Classe di rappresentazione dell'entità Utente.
 * Mappata sulla tabella "utente" del database.
 */

@Entity // Indica che la classe è una entità JPA che deve essere mappata in una tabella nel database.
@Table(name = "utente") // Specifica il nome della tabella nel database a cui l'entità è mappata
public class Utente {
	
	/**
     * Chiave primaria per la tabella "utente".
     */
	@Id //Indica che questo campo rappresenta la chiave primaria
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Indica che il valore della chiave primaria sarà generato automaticamente
	@Column(name = "ID_u") // Specifica il nome della colonna
    private int idUtente;
	
	 /**
     * Nome dell'utente.
     */
	@Column(name = "nome")
	private String nome;
    
	 /**
     * Cognome dell'utente.
     */
	@Column(name = "cognome")
    private String cognome;

	/**
     * Email dell'utente.
     */
	@Column(name = "email")
    private String email;

	 /**
     * Password dell'utente.
     */
	@Column(name = "password")
    private String password;

	/**
     * Lista di dati meteo associati all'utente.
     * Relazione uno-a-molti con la classe DatiMeteo.
     */
	@OneToMany(mappedBy = "utente", cascade = CascadeType.ALL) // Relazione uno-a-molti con la classe DatiMeteo con tutte le operazioni che si propagano in cascata
	private List<DatiMeteo> datiMeteo;

	/**
     * Restituisce l'ID dell'utente.
     * @return idUtente
     */
	public int getIdUtente() {
		return idUtente;
	}

	/**
     * Imposta l'ID dell'utente.
     * @param idUtente ID da impostare
     */
	public void setIdUtente(int idUtente) {
		this.idUtente = idUtente;
	}

	/**
     * Restituisce il nome dell'utente.
     * @return nome
     */
	public String getNome() {
		return nome;
	}

	/**
     * Imposta il nome dell'utente.
     * @param nome Nome da impostare
     */
	public void setNome(String nome) {
		this.nome = nome;
	}

	/**
     * Restituisce il cognome dell'utente.
     * @return cognome
     */
	public String getCognome() {
		return cognome;
	}

	/**
     * Imposta il cognome dell'utente.
     * @param cognome Cognome da impostare
     */
	public void setCognome(String cognome) {
		this.cognome = cognome;
	}

	/**
     * Restituisce l'email dell'utente.
     * @return email
     */
	public String getEmail() {
		return email;
	}

	/**
     * Imposta l'email dell'utente.
     * @param email Email da impostare
     */
	public void setEmail(String email) {
		this.email = email;
	}

	/**
     * Restituisce la password dell'utente.
     * @return password
     */
	public String getPassword() {
		return password;
	}

	/**
     * Imposta la password dell'utente.
     * @param password Password da impostare
     */
	public void setPassword(String password) {
		this.password = password;
	}

	/**
     * Restituisce la lista di dati meteo associati all'utente.
     * @return datiMeteo
     */
	public List<DatiMeteo> getDatiMeteo() {
		return datiMeteo;
	}

	/**
     * Restituisce la lista di dati meteo associati all'utente.
     * @return datiMeteo
     */
	public void setDatiMeteo(List<DatiMeteo> datiMeteo) {
		this.datiMeteo = datiMeteo;
	}

}
