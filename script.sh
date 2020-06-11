#!/usr/bin/env bash

docker-compose build
docker-compose up -d
docker exec -it tvlandia_db_1 psql -U postgres -d postgres -c "alter user postgres with password 'password';"
docker-compose exec db psql -U postgres -c "CREATE DATABASE emailservice;"