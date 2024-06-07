package it.corso.service;

import java.util.HashSet;
import java.util.Set;

import org.springframework.stereotype.Service;

/**
 * Questa classe gestisce una lista nera di token.
 * I token aggiunti a questa lista vengono considerati invalidi e non possono essere utilizzati.
 */

@Service
public class BlackList {

	// Lista di tipo Set che contiene i token invalidi
	private Set<String> tokens = new HashSet<>();

	//Metodo che invalida un token aggiungendolo alla lista dei set
	public void invalidateToken(String token) {
		//Se il token non è ancora stato validato 
		if (!isTokenRevoked(token)) {
			tokens.add(token); //aggiungo il token alla lista nera ->lo rendo invalido			
		}
	}

	//Metodo che verifica se un token è stato invalidato.
	public boolean isTokenRevoked(String token) {
		return tokens.contains(token);
	}

}