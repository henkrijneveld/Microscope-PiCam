#!/bin/bash

sudo killall raspimjpeg 2>/dev/null

# create camera directory in transient memory
sudo mkdir -p /dev/shm/camera
sudo chown www-data:www-data /dev/shm/camera
sudo chmod 777 /dev/shm/camera

# make sure raspimjpeg is dead
sleep 1;

# start again
sudo su -c 'raspimjpeg > /dev/null &' www-data

