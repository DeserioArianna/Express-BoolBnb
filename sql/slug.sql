//Comando per aggiungere la tabella slug
ALTER TABLE house ADD COLUMN slug VARCHAR(255) UNIQUE AFTER id;

// aggiunta degli slug
UPDATE `boolbnb2_db`.`house` SET `slug` = 'appartamento-moderno' WHERE (`id` = '1');
UPDATE `boolbnb2_db`.`house` SET `slug` = 'baita-in-montagna' WHERE (`id` = '2');
UPDATE `boolbnb2_db`.`house` SET `slug` = 'villa-con-piscina' WHERE (`id` = '3');
UPDATE `boolbnb2_db`.`house` SET `slug` = 'casa-indipendente' WHERE (`id` = '4');
UPDATE `boolbnb2_db`.`house` SET `slug` = 'appartamento-con-vista-mare' WHERE (`id` = '5');
UPDATE `boolbnb2_db`.`house` SET `slug` = 'baita-in-valle' WHERE (`id` = '6');
UPDATE `boolbnb2_db`.`house` SET `slug` = 'villa-moderna' WHERE (`id` = '7');
UPDATE `boolbnb2_db`.`house` SET `slug` = 'casa-indipendente-rustica' WHERE (`id` = '8');
UPDATE `boolbnb2_db`.`house` SET `slug` = 'appartamento-in-centro' WHERE (`id` = '9');
UPDATE `boolbnb2_db`.`house` SET `slug` = 'baita-moderna' WHERE (`id` = '10');
UPDATE `boolbnb2_db`.`house` SET `slug` = 'villa-futuristica' WHERE (`id` = '11');
UPDATE `boolbnb2_db`.`house` SET `slug` = 'casa-indipendente-marinaresca' WHERE (`id` = '12');