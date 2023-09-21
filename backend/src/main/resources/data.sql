/* create new table with columns id, type and message */
CREATE TABLE messages (
                          id INT PRIMARY KEY,
                          type VARCHAR(250),
                          message VARCHAR(250)
);


/* + symbol means new line. In frontend it's replaces by \n symbol
insert values into table */
INSERT INTO messages VALUES
                            (1, 'Out of bounds', 'You went out of permitted bounds+"Within you, there is a stillness and a sanctuary to which you can retreat at any time and be yourself."+ ― Hermann Hesse'),
                            (2, 'Out of bounds', 'You went out of permitted bounds+“Give your stress wings and let it fly away.”+ ― Terri Guillemets'),
                            (3, 'Out of bounds', 'You went out of permitted bounds+“Freedom is a calm mind.”+ ― Shane Parrish'),
                            (4, 'Out of bounds', 'You went out of permitted bounds+“Breath is the power behind all things…. I breathe in and know that good things will happen.”+ ― Tao Porchon-Lynch'),
                            (5, 'Out of bounds', 'You went out of permitted bounds+“Your life will be in order when disorder ceases to bother you."+ ― James Pierce'),
                            (6, 'Out of bounds', 'You went out of permitted bounds+“When we are unable to find tranquility within ourselves, it is useless to seek it elsewhere."+ ― François de La Rochefoucauld'),
                            (7, 'Out of bounds', 'You went out of permitted bounds+“Unwind, relax, and deepen into the present moment."+ ― Eckhart Tolle'),
                            (8, 'Out of bounds', 'You went out of permitted bounds+“Don’t let people pull you into their storm. Pull them into your peace."+ ― Kimberly Jones'),
                            (9, 'Out of bounds', 'You went out of permitted bounds+“I breathe in calmness, I breathe out stress.”+ ― Anonymous'),
                            (10, 'Out of bounds', 'You went out of permitted bounds+“The greatest weapon against stress is our ability to choose one thought over another.”+ ― William James'),
                            (11, 'Out of bounds', 'You went out of permitted bounds+“Sleep is when our soul actually refreshes our body.”+ ― Deepak Chopra'),
                            (12, 'Not end of the line', 'You have not reached the end of the line+"Don’t dwell on what went wrong. Instead, focus on what to do next. Spend your energies on moving forward toward finding the answer."+ ― Denis Waitley'),
                            (13, 'Not end of the line', 'You have not reached the end of the line+"If you focus on results, you will never change. If you focus on change, you will get results."+ ― Jack Dixon'),
                            (14, 'Not end of the line', 'You have not reached the end of the line+"We can always choose to perceive things differently. You can focus on what’s wrong in your life, or you can focus on what’s right."+ ― Marianne Williamson'),
                            (15, 'Not end of the line', 'You have not reached the end of the line+"Focus on where you want to go, not on what you fear."+ ― Tony Robbins'),
                            (16, 'Not end of the line', 'You have not reached the end of the line+“I don’t focus on what I’m up against. I focus on my goals and I try to ignore the rest.”+ ― Venus Williams'),
                            (17, 'Not end of the line', 'You have not reached the end of the line+“I learned to focus and work hard and not give up. I learned that every obstacle is really an opportunity.” ― Jenna Ushkowitz'),
                            (18, 'Success', 'Success!+“The most distinguishing feature of winners is their intensity of purpose.”+ ― Alymer Letterman'),
                            (19, 'Success', 'Success!+“Winners are willing to go longer, work harder, and give more than anyone else.”+ ― Vince Lombardi'),
                            (20, 'Success', 'Success!+“Victory is sweetest when you’ve known defeat.”+ ― Malcolm Forbes'),
                            (21, 'Success', 'Success!+“Fortune befriends the bold.”+ ― Emily Dickinson'),
                            (22, 'Success', 'Success!"Always be yourself, express yourself, have faith in yourself, do not go out and look for a successful personality and duplicate it." ― Bruce Lee'),
                            (23, 'Success', 'Success!+“Accept the challenges so that you can feel the exhilaration of victory.”+ ― George S. Patton');
