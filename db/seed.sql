INSERT INTO department (dept_name) VALUES ('Marketing');
INSERT INTO department (dept_name) VALUES ('Engineering');


INSERT INTO role (title, salary, department_id, dept_name) VALUES ('digital marketing manager', 96000, 1, 'Marketing');
INSERT INTO role (title, salary, department_id, dept_name) VALUES ('marketing director', 120000, 1, 'Marketing');
INSERT INTO role (title, salary, department_id, dept_name) VALUES ('software enginner', 110000, 2, 'Engineering');
INSERT INTO role (title, salary, department_id, dept_name) VALUES ('junior developer', 85000, 2, 'Engineering');


INSERT INTO employee (first_name, last_name, role_id) VALUES ('John', 'Doe', 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Michael', 'Jordan', 3, 1);
INSERT INTO employee (first_name, last_name, role_id) VALUES ('Mike', 'Jones', 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Henry', 'Jackson', 4, 1);