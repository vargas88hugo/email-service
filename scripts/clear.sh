#!/usr/bin/env bash

sudo rm -r /var/www/email-service/*
container stop $(docker ps) || :