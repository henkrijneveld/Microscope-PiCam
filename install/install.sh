#!/bin/bash
# rudimentary installer
# installs to /var/www/camera
# no extra facilities for virtual hosts etc
#
# software is intended for dedicate PI attached to camera

pushd .. > /dev/null 2>&1

if [[ "${PWD}" =~ home ]];
then
  echo "Script run from development."
  echo "Only directories absent from repository are created."

  #create the media directory
  if [[ ! -d media ]]; then
    mkdir media
  fi

  # copy initial overrides, if they do not exist
  if [[ ! -f config/config.overrides.js ]]; then
    cp install/config.overrides.js config/config.overrides.js
  fi

  if [[ ! -f config/raspigemcam.overrides.cfg ]]; then
    cp install/raspigemcam.overrides.cfg config/raspigemcam.overrides.cfg
  fi
else
  echo "start install"

  sudo ./stop.sh > /dev/null 2>&1

  # Give www-data his bash shell and other authorizations
  sudo sed -i "s/^www-data:x.*/www-data:x:33:33:www-data:\/var\/www:\/bin\/bash/g" /etc/passwd > /dev/null 2>&1
  sudo usermod -aG video www-data

  # make sure www-data is member of sudo
  # security risk when cam is used in public network
  sudo adduser www-data sudo > /dev/null 2>&1
  sudo rm /etc/sudoers.d/RaspiGemcam > /dev/null 2>&1
  sudo cp install/RaspiGemcam.sudo /etc/sudoers.d/RaspiGemcam
  sudo chmod 440 /etc/sudoers.d/RaspiGemcam

  # make pi user part of www-data group so it can write in the web directory
  sudo adduser pi www-data > /dev/null 2>&1

  #create the system directory
  if [[ ! -d system ]]; then
    sudo mkdir system
  fi

  # copy the program to system
  sudo cp install/raspigemcam system
  sudo chmod +x system/raspigemcam
  sudo cp install/raspigemcam.cfg system

  # create the control pipe
  if [ -e system/FIFO ]; then
    sudo rm system/FIFO
  fi
  sudo mknod system/FIFO p
  sudo chmod 666 system/FIFO

  #create the media directory
  if [[ ! -d media ]]; then
    sudo mkdir media
  fi

  # copy initial overrides, if they do not exist
  if [[ ! -f config/config.overrides.js ]]; then
    sudo cp install/config.overrides.js config/config.overrides.js
  fi

  if [[ ! -f config/raspigemcam.overrides.cfg ]]; then
    sudo cp install/raspigemcam.overrides.cfg config/raspigemcam.overrides.cfggir
  fi

  # setting groups of sitefiles
  # sudo chgrp -R www-data ${PWD}
  sudo chown -R www-data:www-data .

  # make directories writable for everyone in the www-data group
  sudo chmod -R 775 ${PWD}

  # notice to reboot if first time install
  echo "If this is a first-time install, please reboot PI"
fi

popd > /dev/null

echo "Done!"
