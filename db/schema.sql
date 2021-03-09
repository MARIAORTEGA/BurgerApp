### Schema

CREATE DATABASE burgers_db;
USE burgers_db;

CREATE TABLE burgers
(
	id int NOT NULL AUTO_INCREMENT,
	name VARCHAR(40) NOT NULL,
	devoured BOOLEAN, DEFAULT false
	PRIMARY KEY (id)
);
