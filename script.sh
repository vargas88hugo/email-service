#!/usr/bin/env bash

docker-compose build
docker-compose up -d
docker-compose exec db psql -U postgres -d postgres -c "ALTER USER postgres WITH PASSWORD 'password';"
docker-compose exec db psql -U postgres -c "CREATE DATABASE emailservice;"
docker-compose exec db psql -U postgres -c "CREATE DATABASE test;"