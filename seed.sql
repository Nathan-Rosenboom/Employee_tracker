INSERT INTO department (name)
VALUES ('it');

INSERT INTO department (name)
VALUES ('hr');

INSERT INTO department (name)
VALUES ('sales');

INSERT INTO role (title, salary, department_id)
VALUES ('desktop support', 50000.00, 1);

INSERT INTO role (title, salary, department_id)
VALUES ('sales associate', 60000.00, 3);

INSERT INTO role (title, salary, department_id)
VALUES ('hr officer', 65000.00, 2);

INSERT INTO role (title, salary, department_id)
VALUES ('sales manager', 80000.00, 3);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ('Bob', 'Johnson', 1);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ('Frank', 'McGuee', 2);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ('Sally', 'Smith', 3);