## Prerequiste

Install docker desktop at [here](https://www.docker.com/products/docker-desktop/)
Run docker desktop before running the commands

### Create network

```
docker network create -d bridge ias_net
```

### Start container

```
docker-compose down --volumes && docker-compose up --build -d
```

### Open adminer (CRUD tool)

This GUI is inside the docker-compose file of the database. To access the GUI, open your browser and search "localhost:8080".

```
# login credentials
System: MySQL
Server: db
Username: user
Password: password
Database: db
```

\*NOTE: Login credentials can be changed and the database password should really be changed. So, to get new login credentials, contact your container guy or look at the database repo's docker-compose.yml.
