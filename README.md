# CC_backend
This is the backend API of our web Application Ciência Compartilhada

## Introduction
The purpose of this application is to connect teachers and students in the field of scientific research. 
It allows users to make requests to the database and retrieve lists of users, teachers, and projects 
based on a matching algorithm that considers their respective areas of interest. Both teachers and students 
can have preferences for up to 5 areas of expertise. Each project must be associated with a specific area of expertise.

## Getting Started:
To use the application, follow the steps below (if you want to use Docker, ensure Docker is properly installed, configure your .env and jump to [running application with docker](#docker-run)):

- Installation:

    Ensure that Node.js and npm are installed on your system.
    Clone the application repository from [repository URL](https://github.com/CienciaCompartilhada/CC_backend)
    Navigate to the application directory in the terminal.
    Run the command ```npm install``` to install the required dependencies.

- Configuration:

    Rename the .env.example file to .env.
    Open the .env file and set the necessary environment variables, including the database connection details.

- Database Setup:

    - Create a PostgreSQL database with the specified name in the .env file.
    - Run the database migrations using the command ```npm run prisma:migrate:deploy``` to set up the database schema.
    - Run some simple database seeding using the command ```npm run production:seed``` to seed basic data to the database.

- Running the Application:

    - Execute the command ```npm run dev``` to start the application in development mode.
    - You can test the different routes using any api client like ThunderClient or Insomnia REST

- <a name="docker-run">Running the Application with Docker:</a>

    - Open the docker-compose.yml file and ensure it is properly configured for your environment.
    - Execute the command docker-compose up to start the application using Docker containers.
    - Docker Compose will build the necessary images and start the application services.
    - You can test the different routes using any api client like ThunderClient or Insomnia REST

## Usage:
The application provides the following features and functionalities:

- User Registration:
    - Users can create an account by providing their personal information, including their role (teacher or student) and university.

- Searching for Students:
    - Users can search for students based on their roles and areas of expertise.
    - The application will provide a list of matching students based on the matching algorithm.
 
- Searching for Teachers:
    - Users can search for teachers based on their roles and areas of expertise.
    - The application will provide a list of matching teachers based on the matching algorithm.

- Searching for Projects:
    - Users can search for projects based on the desired area of expertise.
    - The application will provide a list of matching projects based on the matching algorithm.

- Matching Algorithm:
    - The matching algorithm considers the preferred areas of expertise of users (teachers and students) and projects.
    - It calculates a matching score based on the overlap of preferred areas of expertise between users and projects.
    - Users and projects with higher matching scores are considered better matches.

## Contributing:
If you would like to contribute to the application, follow these steps:

    1. Fork the repository from [repository URL](https://github.com/CienciaCompartilhada/CC_backend).
    2. Make the desired changes and improvements in your forked repository.
    3. Submit a pull request with a clear description of the changes you have made.
    4. Your contribution will be reviewed, and if approved, it will be merged into the main repository.

## License:
This application is released under the Mozilla Public License 2.0. Please refer to the [LICENSE file](https://github.com/CienciaCompartilhada/CC_backend/blob/master/LICENSE) for more details.

## Acknowledgments:
I would like to acknowledge the following resources and libraries that have been used in the development of this application:

- Prisma: [Prisma URL](https://github.com/prisma/prisma)
- Node.js: [Node.js URL](https://github.com/nodejs)
- Express.js: [Express.js URL](https://github.com/expressjs/express)
- PostgreSQL: [PostgreSQL URL](https://www.postgresql.org/)
- Other libraries and dependencies mentioned in the [package.json file](https://github.com/CienciaCompartilhada/CC_backend/blob/master/package.json).