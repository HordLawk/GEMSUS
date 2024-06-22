# gsdgrad16
## Prerequisites
- [Docker](https://docs.docker.com/engine/install/)
## Build and deploy
1.  Clone the repository
2.  Create and start the containers
    ```shell
    sudo docker compose up -d
    ```
3.  It may take up to a few minutes for the whole system to start up
4.  If everything worked correctly you should be able to access the web client at `localhost:5028` (the port can be
    changed in `./docker-compose.yml` under the `ports` section of the `balancer` service)