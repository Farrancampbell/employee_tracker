DROP DATABASE IF EXISTS employees;
CREATE DATABASE employees;
USE employees;

CREATE TABLE department(
id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
name VARCHAR(30) NOT NULL
);

CREATE TABLE roles(
id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
title VARCHAR(30),
salary DECIMAL,
department_id INT,
FOREIGN KEY (department_id) REFERENCES department(id)
);


CREATE TABLE employee(
id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INT,
manager_id INT,
FOREIGN KEY(manager_id) REFERENCES employee(id),
FOREIGN KEY(role_id) REFERENCES roles(id)
);

