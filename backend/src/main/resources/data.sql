DROP TABLE IF EXISTS messages;

CREATE TABLE messages (
                          id INT PRIMARY KEY,
                          type VARCHAR(250),
                          message VARCHAR(250)
);



INSERT INTO messages VALUES
                            (1, 'Out of bounds', 'You went out of bounds. Please, calm down and try again'),
                            (2, 'Out of bounds', 'You went out of bounds. Breath in and relax'),
                            (3, 'Out of bounds', 'You went out of bounds. Count to 10 and try again'),
                            (4, 'Not end of the line', 'You have not reached the end of the line. Please, calm down and try again'),
                            (5, 'Success', 'Congratulations!'),
                            (6, 'Success', 'Amazing job!');
