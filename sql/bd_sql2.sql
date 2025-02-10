-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: boolbnb2_db
-- ------------------------------------------------------
-- Server version	8.4.3

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
-- Table structure for table `house`
--

DROP TABLE IF EXISTS `house`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `house` (
  `id` bigint NOT NULL,
  `id_property` bigint DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `rooms` int DEFAULT NULL,
  `url_img` varchar(255) DEFAULT NULL,
  `bedrooms` int DEFAULT NULL,
  `bathrooms` int DEFAULT NULL,
  `square_meters` int DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `likes` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_property` (`id_property`),
  CONSTRAINT `house_ibfk_1` FOREIGN KEY (`id_property`) REFERENCES `property` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `house`
--

LOCK TABLES `house` WRITE;
/*!40000 ALTER TABLE `house` DISABLE KEYS */;
INSERT INTO `house` VALUES (1,1,'Appartamento nel centro storico',3,'http://example.com/img1.jpg',2,1,80,'Via Roma 1, Milano','info@example.com',10),(2,2,'Villa con piscina e giardino',5,'http://example.com/img2.jpg',4,3,200,'Via Venezia 2, Roma','villa@example.com',15),(3,3,'Casa indipendente con terrazza',4,'http://example.com/img3.jpg',3,2,150,'Via Napoli 3, Firenze','casa@example.com',20),(4,4,'Baita in montagna con vista',2,'http://example.com/img4.jpg',1,1,60,'Via Milano 4, Trento','baita@example.com',5),(5,1,'Appartamento moderno in centro',2,'http://example.com/img5.jpg',1,1,70,'Via Torino 5, Bologna','modern@example.com',12),(6,2,'Villa lussuosa con vista mare',6,'http://example.com/img6.jpg',5,4,250,'Via Firenze 6, Napoli','luxury@example.com',30),(7,3,'Casa indipendente con giardino',3,'http://example.com/img7.jpg',2,2,120,'Via Palermo 7, Palermo','terrazza@example.com',18),(8,4,'Baita accogliente in bosco',2,'http://example.com/img8.jpg',1,1,50,'Via Genova 8, Bolzano','cozy@example.com',8),(9,1,'Appartamento vista mare',3,'http://example.com/img9.jpg',2,1,90,'Via Livorno 9, Genova','sea@example.com',25),(10,2,'Villa con vista panoramica',4,'http://example.com/img10.jpg',3,2,180,'Via Pisa 10, Siena','panorama@example.com',22);
/*!40000 ALTER TABLE `house` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `property`
--

DROP TABLE IF EXISTS `property`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `property` (
  `id` bigint NOT NULL,
  `type` enum('appartamento','villa','casa indipendente','baita') DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `property`
--

LOCK TABLES `property` WRITE;
/*!40000 ALTER TABLE `property` DISABLE KEYS */;
INSERT INTO `property` VALUES (1,'appartamento'),(2,'villa'),(3,'casa indipendente'),(4,'baita');
/*!40000 ALTER TABLE `property` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `review` (
  `id_recensione` bigint NOT NULL,
  `id_casa` bigint DEFAULT NULL,
  `review_content` text,
  `username` varchar(255) DEFAULT NULL,
  `length_of_stay` smallint DEFAULT NULL,
  `date` date DEFAULT NULL,
  PRIMARY KEY (`id_recensione`),
  KEY `id_casa` (`id_casa`),
  CONSTRAINT `review_ibfk_1` FOREIGN KEY (`id_casa`) REFERENCES `house` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review`
--

LOCK TABLES `review` WRITE;
/*!40000 ALTER TABLE `review` DISABLE KEYS */;
INSERT INTO `review` VALUES (1,1,'Ottima posizione e servizi','user1',3,'2023-01-15'),(2,2,'Villa stupenda con piscina','user2',7,'2023-02-20'),(3,3,'Casa spaziosa e comoda','user3',5,'2023-03-10'),(4,4,'Baita perfetta per rilassarsi','user4',2,'2023-04-05'),(5,5,'Appartamento moderno e pulito','user5',4,'2023-05-12'),(6,6,'Esperienza lussuosa indimenticabile','user6',10,'2023-06-18'),(7,7,'Terrazza fantastica con vista','user7',6,'2023-07-22'),(8,8,'Baita accogliente e calda','user8',3,'2023-08-30'),(9,9,'Vista mare mozzafiato','user9',7,'2023-09-14'),(10,10,'Vista panoramica incredibile','user10',5,'2023-10-25');
/*!40000 ALTER TABLE `review` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-02-10 16:24:28
