#!/bin/bash

sudo killall raspigemcam 2>/dev/null
# TODO: check if process exists before killall (btw: -q does not work)
# if [ $? -ne 0 ];
#then
#    echo "Could not terminate raspigemcam (no sudo permissions?)"
#    exit 1
#fi

# make sure raspigemcam is dead
sleep 1;

# create camera directory in transient memory
sudo mkdir -p /dev/shm/gemcam
if [ $? -ne 0 ];
then
    echo "Could not create /dev/shm/gemcam (no sudo permissions?)"
    exit 1
fi

sudo chown -R www-data:www-data /dev/shm/gemcam
if [ $? -ne 0 ];
then
    echo "Could not chown /dev/shm/gemcam"
    exit 1
fi

sudo chmod 777 /dev/shm/gemcam
if [ $? -ne 0 ];
then
    echo "Could not set permissions on /dev/shm/gemcam"
    exit 1
fi

# start again
base=${PWD}
cd system
sudo su -c './raspigemcam -bp ${base} > /dev/null &' www-data
if [ $? -ne 0 ];
then
    echo "Could not start system/raspigemcam"
    exit 1
fi

sleep 1;

exit 0

