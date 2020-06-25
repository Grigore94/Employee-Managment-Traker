DROP DATABASE IF EXISTS employee_trakerDB;

CREATE database employee_trakerDB;

USE employee_trakerDB;

CREATE TABLE departament (
    id INT NOT NULL AUTO_INCREMENT,
    departament VARCHAR(35) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE status(
id INT NOT NULL AUTO_INCREMENT,
title VARCHAR(35) NOT NULL,
salary DECIMAL(10.4) NOT NULL,
departament_ID INT NOT NULL,
PRIMARY KEY(id)
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(35) NOT NULL,
    last_name VARCHAR(35) NOT NULL,
    status_id INT NOT NULL,
    manager_id INT NOT NULL,
    PRIMARY KEY(id)
);

SELECT * FROM departament;
SELECT * FROM status;
SELECT * FROM employee;