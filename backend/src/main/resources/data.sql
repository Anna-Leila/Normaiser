DROP TABLE IF EXISTS messages;

CREATE TABLE messages (
                          id INT PRIMARY KEY,
                          type VARCHAR(250),
                          message VARCHAR(250)
);


// + symbol means new line. In frontend it's replaces by \n symbol
INSERT INTO messages VALUES
                            (1, 'Out of bounds', 'You went out of permitted bounds+"Within you, there is a stillness and a sanctuary to which you can retreat at any time and be yourself."+ ― Hermann Hesse'),
                            (2, 'Out of bounds', 'You went out of permitted bounds+“Give your stress wings and let it fly away.”+ ― Terri Guillemets'),
                            (3, 'Out of bounds', 'You went out of permitted bounds+“Freedom is a calm mind.”+ ― Shane Parrish'),
                            (5, 'Not end of the line', 'Not end of the line!'),
                            (6, 'Success', 'Amazing job!');
