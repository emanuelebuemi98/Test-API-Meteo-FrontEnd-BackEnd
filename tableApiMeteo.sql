Create Database api_meteo_db;

CREATE TABLE `utente` (
  `ID_u` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) DEFAULT NULL,
  `cognome` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID_u`),
  UNIQUE KEY `email` (`email`)
);

CREATE TABLE `datimeteo` (
  `ID_m` int NOT NULL AUTO_INCREMENT,
  `citta` varchar(255) DEFAULT NULL,
  `temperatura` double DEFAULT NULL,
  `umidita` int DEFAULT NULL,
  `descrizione` varchar(255) DEFAULT NULL,
  `velocita_vento` double DEFAULT NULL,
  `utente_id` int DEFAULT NULL,
  PRIMARY KEY (`ID_m`),
  FOREIGN KEY (`utente_id`) REFERENCES `utente` (`ID_u`)
);
