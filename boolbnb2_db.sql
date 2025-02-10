-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: boolbnb2_db
-- ------------------------------------------------------
-- Server version	8.0.41

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
  `id` bigint NOT NULL AUTO_INCREMENT,
  `id_property` bigint DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `descr` varchar(255) DEFAULT NULL,
  `rooms` tinyint DEFAULT NULL,
  `url_img` varchar(255) DEFAULT NULL,
  `bedrooms` tinyint DEFAULT NULL,
  `bathrooms` tinyint DEFAULT NULL,
  `square_meters` int DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `likes` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_property` (`id_property`),
  CONSTRAINT `house_ibfk_1` FOREIGN KEY (`id_property`) REFERENCES `property` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `house`
--

LOCK TABLES `house` WRITE;
/*!40000 ALTER TABLE `house` DISABLE KEYS */;
INSERT INTO `house` VALUES (1,1,'Appartamento moderno','Milano','Appartamento con vista',3,'img1.jpg',2,1,80,'Via Roma 10, Milano','host1@example.com',150),(2,2,'Baita in montagna','Trento','Rustica e accogliente',4,'img2.jpg',3,2,120,'Strada Alpina 5, Trento','host2@example.com',200),(3,3,'Villa con piscina','Roma','Elegante e spaziosa',6,'img3.jpg',4,3,300,'Via Appia 22, Roma','host3@example.com',350),(4,4,'Casa indipendente','Firenze','Perfetta per famiglie',5,'img4.jpg',3,2,150,'Via dei Fiori 8, Firenze','host4@example.com',180);
/*!40000 ALTER TABLE `house` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `property`
--

DROP TABLE IF EXISTS `property`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `property` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `type` enum('appartamento','baita','villa','casa indipendente') NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `property`
--

LOCK TABLES `property` WRITE;
/*!40000 ALTER TABLE `property` DISABLE KEYS */;
INSERT INTO `property` VALUES (1,'appartamento'),(2,'baita'),(3,'villa'),(4,'casa indipendente');
/*!40000 ALTER TABLE `property` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `review` (
  `id_review` bigint NOT NULL AUTO_INCREMENT,
  `id_house` bigint DEFAULT NULL,
  `review_content` text,
  `username` varchar(255) DEFAULT NULL,
  `length_of_stay` smallint DEFAULT NULL,
  `date` date DEFAULT NULL,
  PRIMARY KEY (`id_review`),
  KEY `id_house` (`id_house`),
  CONSTRAINT `review_ibfk_1` FOREIGN KEY (`id_house`) REFERENCES `house` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review`
--

LOCK TABLES `review` WRITE;
/*!40000 ALTER TABLE `review` DISABLE KEYS */;
INSERT INTO `review` VALUES (1,1,'Bellissimo appartamento con vista stupenda!','MarcoR',5,'2024-01-15'),(2,2,'Baita molto accogliente e immersa nella natura.','AnnaB',7,'2024-02-01'),(3,3,'La villa era incredibile, spazi enormi e piscina fantastica!','LucaD',10,'2024-03-10'),(4,4,'Casa perfetta per la nostra famiglia, torneremo sicuramente.','ElisaM',3,'2024-04-05');
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

-- Dump completed on 2025-02-10 18:22:46
