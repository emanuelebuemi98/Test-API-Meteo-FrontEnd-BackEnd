package it.corso.dto;

/**
 * Data Transfer Object (DTO) per l'entità Utente.
 * Utilizzato per trasferire dati tra i livelli dell'applicazione.
 */

public class UtenteDto {
	
    private String nome;
    private String cognome;
    private String email;
    
	public String getNome() {
		return nome;
	}
	public void setNome(String nome) {
		this.nome = nome;
	}
	public String getCognome() {
		return cognome;
	}
	public void setCognome(String cognome) {
		this.cognome = cognome;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
    
}
