### Create network

```
docker network create -d bridge ias_net
```

### Start container

```
docker-compose down --volumes && docker-compose up --build -d
```