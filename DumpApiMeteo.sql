-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: api_meteo_db
-- ------------------------------------------------------
-- Server version	8.0.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `datimeteo`
--

DROP TABLE IF EXISTS `datimeteo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `datimeteo` (
  `ID_m` int NOT NULL AUTO_INCREMENT,
  `citta` varchar(255) DEFAULT NULL,
  `temperatura` double DEFAULT NULL,
  `umidita` int DEFAULT NULL,
  `descrizione` varchar(255) DEFAULT NULL,
  `velocita_vento` double DEFAULT NULL,
  `utente_id` int DEFAULT NULL,
  PRIMARY KEY (`ID_m`),
  KEY `utente_id` (`utente_id`),
  CONSTRAINT `datimeteo_ibfk_1` FOREIGN KEY (`utente_id`) REFERENCES `utente` (`ID_u`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `datimeteo`
--

LOCK TABLES `datimeteo` WRITE;
/*!40000 ALTER TABLE `datimeteo` DISABLE KEYS */;
INSERT INTO `datimeteo` VALUES (1,'Messina',24.99,72,'few clouds',6.69,2),(2,'Catania',23.47,70,'clear sky',4.63,2),(3,'Province of Palermo',20.87,56,'clear sky',1.66,2),(5,'Province of Trapani',24.04,42,'overcast clouds',5.1,1),(6,'Roma',25.3,60,'sunny',0,1),(7,'Siragusa',12.3,81,'Sunny',5.66,1),(8,'Catanzaro',15,38,'cloudy',7.3,2),(9,'Parma',26.48,63,'overcast clouds',1.75,1),(12,'Bari',25.02,54,'clear sky',4.63,4),(13,'Milan',27.66,51,'few clouds',2.57,1),(14,'Provincia di Cagliari',24.61,65,'clear sky',5.14,4),(15,'Enna',29.21,20,'clear sky',2.08,6),(16,'Province of Ragusa',24.32,44,'clear sky',3.6,1),(17,'Province of Agrigento',23.49,32,'clear sky',1.96,4),(19,'Milazzo',25.75,69,'clear sky',3.58,5),(20,'Catania',29.71,37,'clear sky',9.26,5);
/*!40000 ALTER TABLE `datimeteo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `utente`
--

DROP TABLE IF EXISTS `utente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `utente` (
  `ID_u` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) DEFAULT NULL,
  `cognome` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID_u`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `utente`
--

LOCK TABLES `utente` WRITE;
/*!40000 ALTER TABLE `utente` DISABLE KEYS */;
INSERT INTO `utente` VALUES (1,'Filippo','Milli','filippo.milli@gmail.com','d1cd71348b59e94763805e6b8a32ad7126ea1006715ae17640fa8def78887f1c'),(2,'Emanuele','Buemi','emanuele.buemi@gmail.con','22b7dec7305d63e2c769b0c9141114e69a194cc853b444c73b7be3a0771b628a'),(3,'Fabiana','Valentini','fabiana.valenti@gmail.con','4441a31d48870ce70bb92f166834d080621d5cfb925597a5c731297db61e83c6'),(4,'Lucia','Lilli','lucia.lilli@gmail.com','a297281a71535115ed2859433adaf31e005ee515dff5ffbe6ba897eb967da681'),(5,'Francesco','Milone','franci.milone@gmail.com','4441a31d48870ce70bb92f166834d080621d5cfb925597a5c731297db61e83c6'),(6,'Mattia','Vario','matti.vario@gmail.com','e4dc7f4d3c45bddfc9f0ef046446bab87aea2f5e3c95f912cb72325d3fdd757f');
/*!40000 ALTER TABLE `utente` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-07 18:06:06
