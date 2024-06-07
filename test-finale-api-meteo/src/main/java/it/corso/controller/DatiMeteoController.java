package it.corso.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;

import it.corso.dto.DatiMeteoDto;
import it.corso.service.DatiMeteoService;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

/**
 * Controller per la gestione delle operazioni relative ai dati meteo.
 */

@Path("meteo")
public class DatiMeteoController {

    @Autowired
    private DatiMeteoService datiMeteoService; //Iniezione della dipendenza del servizio per la gestione dei dati meteo
     
    // Metodo per gestire le risposte HTTP durante il salvataggio dei dati meteo
    @POST
    @Path("salva")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response salvaDatiMeteo(@RequestBody DatiMeteoDto datiMeteoDto) {
        try {
        	// Salvataggio dei dati meteo tramite il servizio
            datiMeteoService.salvaDatiMeteo(datiMeteoDto);
            return Response.status(Response.Status.OK).build(); // ritorno una risposta con codice 200 - OK (successo)
        } catch (Exception e) {
        	// In caso di eccezione, ritorno una risposta con codice 500 (errore nel server)
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Metodo per gestire le risposte HTTP durante il recupero dei dati meteo di un utente specifico
    @GET
    @Path("/utente")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getDatiMeteoUtente(@QueryParam("userId") int userId) {
        try {
        	 // Recupero dei dati meteo dell'utente tramite il servizio
            List<DatiMeteoDto> datiMeteo = datiMeteoService.getDatiMeteoUtente(userId);
            return Response.status(Response.Status.OK).entity(datiMeteo).build(); // ritorno una risposta con codice 200 - OK (successo) e i dati meteo dell'utente recuperati
        } catch (Exception e) {
        	// In caso di eccezione, ritorno una risposta con codice 500 (errore nel server)
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        }
    }
}