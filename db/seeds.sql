USE employeesDB;

INSERT INTO department (id, name)
VALUES (1, "Sales");
INSERT INTO department (id, name)
VALUES (2, "Finance");
INSERT INTO department (id, name)
VALUES (3, "Legal");

INSERT INTO role (id, title, salary, department_id)
VALUES (1, "Sales Lead", 110000.00, 1);
INSERT INTO role (id, title, salary, department_id)
VALUES (2, "Sales Team Member", 90000.00, 1);

INSERT INTO role (title, salary, department_id)
VALUES (3, "Accountant", 70000.00, 2);
INSERT INTO role (title, salary, department_id)
VALUES (4, "Senior Accountant", 110000.00, 2);

INSERT INTO role (title, salary, department_id)
VALUES (5, "Legal Team Lead", 200000.00, 3);
INSERT INTO role (title, salary, department_id)
VALUES (6, "Paralegal", 90000.00, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Sarah", "Jane", 1, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Mike", "Hall", 2, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Tom", "Potts", 3, 4);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Linda", "Bates", 4, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jeff", "Hunt", 5, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Gary", "Stevens", 6, 5);