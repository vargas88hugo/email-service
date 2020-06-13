#!/usr/bin/env bash

cd /var/www/email-service
export DB_USER=$(aws ssm get-parameter --name db_user --with-decryption --output text --query Parameter.Value)
export DB_PASSWORD=$(aws ssm get-parameter --name db_password --with-decryption --output text --query Parameter.Value)
export SECRET=$(aws ssm get-parameter --name secret --with-decryption --output text --query Parameter.Value)
export SPARKPOST_KEY=$(aws ssm get-parameter --name sparkpost_key --with-decryption --output text --query Parameter.Value)
export SENDGRID_KEY=$(aws ssm get-parameter --name sendgrid_key --with-decryption --output text --query Parameter.Value)
docker-compose build
docker-compose up -d
docker-compose exec db psql -U postgres -d postgres -c "ALTER USER $DB_USER WITH PASSWORD '$DB_PASSWORD';" || :
docker-compose exec db psql -U postgres -c "CREATE DATABASE emailservice;" || :
docker-compose exec db psql -U postgres -c "CREATE DATABASE test;" || :
docker-compose up -d