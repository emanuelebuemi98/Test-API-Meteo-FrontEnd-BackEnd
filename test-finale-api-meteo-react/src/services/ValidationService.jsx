/*Funzioni per validare i campi relativi alla registrazione degli utenti */

/* Funzione per validare il nome.
   Controlla se il nome fornito rispetta i criteri della regex:
   - Deve contenere solo lettere (maiuscole e minuscole), spazi e apostrofi.
   - Deve essere lungo tra 5 e 50 caratteri.
   Restituisce true se il nome è valido, false altrimenti. */
export function validateNome(nome) {
    const regex = /^[a-zA-Z\s']{5,50}$/;
    return regex.test(nome);
}

/* Funzione per validare il cognome.
   Controlla se il cognome fornito rispetta i criteri della regex:
   - Deve contenere solo lettere (maiuscole e minuscole), spazi e apostrofi.
   - Deve essere lungo tra 5 e 50 caratteri.
   Restituisce true se il cognome è valido, false altrimenti. */
export function validateCognome(cognome) {
    const regex = /^[a-zA-Z\s']{5,50}$/;
    return regex.test(cognome);
}

/* Funzione per validare l'indirizzo email.
   Controlla se l'email fornita rispetta i criteri della regex:
   - Deve avere una struttura valida di email (es. nome@dominio.estensione).
   - Può contenere lettere, numeri e caratteri speciali come punto, più, underscore e trattino.
   - La parte del dominio deve essere lunga tra 2 e 24 caratteri.
   Restituisce true se l'email è valida, false altrimenti. */
export function validateEmail(email) {
    const regex = /^[A-z0-9\.+_\-]+@[A-z0-9\._\-]+\.[A-z]{2,24}$/;
    return regex.test(email);
}

/* Funzione per validare la password.
   Controlla se la password fornita rispetta i criteri della regex:
   - Deve essere lunga tra 6 e 20 caratteri.
   - Deve contenere almeno una lettera maiuscola.
   - Deve contenere almeno una lettera minuscola.
   - Deve contenere almeno una cifra.
   - Deve contenere almeno un carattere speciale (es. @$!%*?&).
   Restituisce true se la password è valida, false altrimenti. */
export function validatePassword(password) {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,20}$/;
    return regex.test(password);
}