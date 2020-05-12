DROP DATABASE IF EXISTS employee_tracker_db;

CREATE DATABASE employee_tracker_db;

USE employee_tracker_db;

CREATE TABLE department (
id int NOT NULL AUTO_INCREMENT,
name VARCHAR(30),
PRIMARY KEY (id)
);

CREATE TABLE role (
id int NOT NULL AUTO_INCREMENT,
title VARCHAR(30),
salary decimal,
department_id int,
CONSTRAINT fk_department
FOREIGN KEY  (department_id)
REFERENCES department(id),
PRIMARY KEY (id)
);

CREATE TABLE employee (
id int NOT NULL AUTO_INCREMENT,
first_name VARCHAR(30),
last_name VARCHAR(30),
role_id int,
CONSTRAINT fk_role
FOREIGN KEY  (role_id)
REFERENCES role(id),
manager_id int,
CONSTRAINT fk_manager
FOREIGN KEY  (manager_id)
REFERENCES employee(id),
PRIMARY KEY (id)
);



