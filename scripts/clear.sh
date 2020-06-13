#!/usr/bin/env bash

sudo rm -r /var/www/email-service/*
docker container stop $(docker ps) || :