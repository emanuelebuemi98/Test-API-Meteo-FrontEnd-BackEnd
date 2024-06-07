package it.corso.dto;

/**
 * Data Transfer Object (DTO) per l'entità DatiMeteo.
 * Utilizzato per trasferire dati tra i livelli dell'applicazione.
 */

public class DatiMeteoDto {
	
	private String citta;
	private double temperatura;
	private int umidita;
	private String descrizione;
	private double velocita;
	private int utente_id;
	
	public String getCitta() {
		return citta;
	}
	public void setCitta(String citta) {
		this.citta = citta;
	}
	public double getTemperatura() {
		return temperatura;
	}
	public void setTemperatura(double temperatura) {
		this.temperatura = temperatura;
	}
	public int getUmidita() {
		return umidita;
	}
	public void setUmidita(int umidita) {
		this.umidita = umidita;
	}
	public String getDescrizione() {
		return descrizione;
	}
	public void setDescrizione(String descrizione) {
		this.descrizione = descrizione;
	}
	public double getVelocita() {
		return velocita;
	}
	public void setVelocita(double velocita) {
		this.velocita = velocita;
	}
	public int getUtente_id() {
		return utente_id;
	}
	public void setUtente_id(int utente_id) {
		this.utente_id = utente_id;
	}
	
}
