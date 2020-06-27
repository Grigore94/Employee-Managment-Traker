USE employee_trakerDB;

INSERT INTO department (department) VALUES 
("Manager"),
("Director"),
("President"),
("Driver"),
("Mover");

INSERT INTO status (title, salary, department_id) VALUES 
("Manager", 100000, 1),
("Director", 130000, 2),
("Server", 65000, 3),
("Mover", 60000, 4),
("President", 400000, 5);

INSERT INTO employee (first_name, last_name, status_id, manager_id) VALUES 
("Angela", 'Merkel', 2, 3),
('Barak', 'Obama', 4, 4),
('Donald', 'Trump', 3, 3),
('Vladimir', 'Putin', 8, 7),
('Traian', 'Basescu', 9, 9),
('Emanuel', 'Macron', 5, 5),
('Sergio', 'Matarella', 7, 7),
('Igor', 'Dodon', 5, 5);

