package it.corso.dto;

import java.util.Date;

/**
 * Data Transfer Object (DTO) per le risposte di login dell'utente.
 */

public class UtenteLoginResponseDto {
	
	private String token; //Token di autenticazione che deve essere generato
	private Date ttl; //Tempo di scadenza del token
	private Date tokenCreationTime; //Data di creazione del token
	
	public String getToken() {
		return token;
	}
	public void setToken(String token) {
		this.token = token;
	}
	public Date getTtl() {
		return ttl;
	}
	public void setTtl(Date ttl) {
		this.ttl = ttl;
	}
	public Date getTokenCreationTime() {
		return tokenCreationTime;
	}
	public void setTokenCreationTime(Date tokenCreationTime) {
		this.tokenCreationTime = tokenCreationTime;
	}
	
	
}
