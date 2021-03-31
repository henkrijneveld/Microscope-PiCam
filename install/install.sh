#!/bin/bash
# rudimentary installer
# installs to /var/www/camera
# no extra facilities for virtual hosts etc
#
# software is intended for dedicate PI attached to camera

# giove www-data its shell
sudo -u www-data bash

if [[ "${PWD}" =~ home ]];
then
  echo "Don't run this script from development!"
  echo "It will mess with your groups"
  exit 1
fi

# make sure www-data is member of sudo
# security risk when cam is used in public network
sudo adduser www-data sudo > /dev/null
sudo rm /etc/sudoers.d/RaspiGemcam
sudo cp RaspiGemcam.sudo /etc/sudoers.d/RaspiGemcam
sudo chmod 440 /etc/sudoers.d/RaspiGemcam

# copy the program to system
sudo cp raspigemcam ../system
sudo chmod +x ../system/raspigemcam
sudo cp raspigemcam.cfg ../system

pushd .. > /dev/null

#create the media directory
if [[ ! -d media ]]; then
  sudo mkdir media
fi

# create the control pipe
if [ -e system/FIFO ]; then
  sudo rm system/FIFO
fi
sudo mknod system/FIFO p
sudo chmod 666 system/FIFO

# setting groups of sitefiles
# sudo chgrp -R www-data ${PWD}
sudo chown -R www-data:www-data .

# make directories writable
sudo chmod 775 ${PWD}/media
sudo chmod 775 ${PWD}/config

popd > /dev/null

