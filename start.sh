#!/bin/bash

sudo killall raspigemcam 2>/dev/null

# create camera directory in transient memory
sudo mkdir -p /dev/shm/gemcam
sudo chown www-data:www-data /dev/shm/gemcam
sudo chmod 777 /dev/shm/gemcam

# make sure raspigemcam is dead
sleep 2;

# start again
sudo su -c 'system/raspigemcam > /dev/null &' www-data

