# FullStackTemplateDocker
Full Stack Template with Nodejs, Reactjs, Express Web Server, MySQL database running in docker.

First clone this repository with your local machine then download Docker from this link here: https://docs.docker.com/get-docker/

After that is downloaded, run in your MacOS terminal: docker-compose up --build

This command will then build the Dockerfiles and start them up with compose.

To stop these containers, run: docker-compose stop.

After you have built the containers the first time, you don't need to rebuild them each time unless you install new dependancies.

The dependancies installed are:
- nodemon
- dotenv
- expressJS
- bcrypt
- mysql2
- cors
- React Router Dom

To uninstall a dependancy from the project, type 'npm uninstall <package_name> --save'.



Happy Coding!!
