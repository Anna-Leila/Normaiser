# Normaiser
### Description
The application helps you calm down, increases concentration and attention. A couple of minutes for a good result!\
You are asked to pull the rose along the spiral towards the center. If the center of the rose deviates significantly from the line, the attempt will be considered failed. If you stop before reaching the end, the attempt will also be considered failed. If you complete the entire spiral successfully, you will receive an approximate estimate of your condition depending on the speed in different sections of the spiral.\
Good luck!
### Frameworks and libraries
React JS and Bootstrap 5 for frontend\
Spring Boot for backend
### Installation
Development and testing of the project was on Windows 10 Home, with Java Oracle JDK 19.0.2, git 2.39.1, NodeJS v18.16.1, npm 9.8.0, Maven 3.9.4\
Open JDK should work too.\
Your firewall must have permissions for access to local networks (for frontend and backend separately). Typically the firewall asks for access permission during the 1st run of the project.\
Open terminal. Go to your_folder \
Run "git clone https://github.com/Anna-Leila/Normaiser.git" in your_folder
##### Run project from IntelliJ Idea:
Requirements: Java 17 (as a minimum version), git, NodeJS, npm and IntelliJ Idea Ultimate should be installed on the computer in order to run the project. There's no need to install Maven in this case.
1.	Open your_folder\Normaiser\backend folder as IntelliJ Idea project
2.	Go to backend\src\main\java\com\university\normaiser\NormaiserApplication.java
3.	Run NormaiserApplication.java
4.	Open your_folder\Normaiser\frontend folder as another IntelliJ Idea project
5.	Install dependencies with “npm install” command in IntelliJ terminal
6.	Run with “npm start”. The project will be started in a new tab in the default browser

##### Run project from terminal:
Requirements: Java 17 (as a minimum version), git, NodeJS, npm, Maven should be installed on the computer in order to run the project.
1.	Open a Terminal window. Go to your_folder\Normaiser\backend
2.	Run with “mvn spring-boot:run” command
3.	Open new Terminal window. Go to your_folder\Normaiser\frontend
4.	Install dependencies with “npm install” command
5.	Run with “npm start”. The project will be started in a new tab in the default browser

Alternatively, you can run backend part like this:
1.	Open a Terminal window. Go to your_folder\Normaiser\backend
2.	Build maven project and install project files with “mvn clean install”
3.	Run with “java -jar target/normaiser-0.0.1-SNAPSHOT.jar”\
Frontend installation and running remain unchanged
