DROP DATABASE IF EXISTS employeemanage;
CREATE DATABASE employeemanage;

USE employeemanage;

CREATE TABLE department
(
    id INT NOT NULL,
    name VARCHAR (30),
    PRIMARY KEY
    (id)
);
INSERT INTO department 
    (id, name)
VALUES 
    (1, 'Sales');

INSERT INTO department 
    (id, name)
VALUES 
    (2, 'Engineering');

INSERT INTO department 
    (id, name)
VALUES 
    (3, 'Finanace');

INSERT INTO department 
    (id, name)
VALUES 
    (4, 'Legal');

INSERT INTO department 
    (id, name)
VALUES 
    (5, 'HR');

CREATE TABLE employee
(
    id INT NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    manager_id INT,
    PRIMARY KEY(id),
    FOREIGN KEY(manager_id)
    REFERENCES employee(id)
);

INSERT INTO employee 
    (id, first_name, last_name, role_id, manager_id)
VALUES 
    (1, 'Meredith', 'Grey', 1, null);

INSERT INTO employee 
    (id, first_name, last_name, role_id, manager_id)
VALUES 
    (2, 'Derek', 'Shepard', 2, 1);

INSERT INTO employee
     (id, first_name, last_name, role_id, manager_id)
VALUES 
     (3, 'Izzie', 'Stevens', 3, 1);

INSERT INTO employee
     (id, first_name, last_name, role_id, manager_id)
VALUES 
    (4, 'Christina', 'Yang', 4, 1);

INSERT INTO employee
     (id, first_name, last_name, role_id, manager_id)
VALUES 
    (5, 'Callie', 'Torres', 5, 2);

INSERT INTO employee 
    (id, first_name, last_name, role_id, manager_id)
VALUES 
    (6, 'Alex', 'Karev', 6, 3);

INSERT INTO employee 
    (id, first_name, last_name, role_id, manager_id)
VALUES 
    (7, 'Jackson', 'Avery', 7, 3);

INSERT INTO employee 
    (id, first_name, last_name, role_id, manager_id)
VALUES 
    (8, 'Miranda', 'Bailey', 8, 4);

INSERT INTO employee 
    (id, first_name, last_name, role_id, manager_id)
VALUES 
    (9, 'George', 'OMalley', 9, 4);

INSERT INTO employee 
    (id, first_name, last_name, role_id, manager_id)
VALUES 
    (10, 'Mark', 'Sloan', 10, 4);

CREATE TABLE role
(
    id INT NOT NULL,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT,
    PRIMARY KEY
            (id)
);

INSERT INTO role 
    (id, title, salary, department_id)
VALUES 
    (1, 'Sales Lead', 100000, 1);

INSERT INTO role 
    (id, title, salary, department_id)
VALUES 
    (2, 'Lead Engineer', 160000, 2);

INSERT INTO role 
    (id, title, salary, department_id)
VALUES
     (3, 'Chief Financial Officer', 170000, 3);

INSERT INTO role 
    (id, title, salary, department_id)
VALUES 
    (4, 'Attorney', 180000, 4);

INSERT INTO role 
    (id, title, salary, department_id)
VALUES 
    (5, 'HR Director', 205000, 5);

INSERT INTO role 
    (id, title, salary, department_id)
VALUES 
    (6, 'Sales Rep', 70000, 1);

INSERT INTO role
     (id, title, salary, department_id)
VALUES 
    (7, 'Associate Engineer', 90000, 2);

INSERT INTO role 
    (id, title, salary, department_id)
VALUES 
    (8, 'Financial Analyst', 95000, 3);

INSERT INTO role 
    (id, title, salary, department_id)
VALUES 
    (9, 'Paralegal', 65000, 4);

INSERT INTO role
    (id, title, salary, department_id)
VALUES 
    (10, 'HR Generalist', 140000, 5);

            


            



            