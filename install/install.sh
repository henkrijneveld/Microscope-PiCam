#!/bin/bash
# rudimentary installer
# installs to /var/www/camera
# no extra facilities for virtual hosts etc
#
# software is intended for dedicate PI attached to camera

export PERL_BADLANG=0

pushd .. > /dev/null

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
  # Give www-data his bash shell and other authorizations
  sudo sed -i "s/^www-data:x.*/www-data:x:33:33:www-data:\/var\/www:\/bin\/bash/g" /etc/passwd > /dev/null
  sudo usermod -aG video www-data

  # make sure www-data is member of sudo
  # security risk when cam is used in public network
  sudo adduser www-data sudo > /dev/null
  sudo rm /etc/sudoers.d/RaspiGemcam
  sudo cp install/RaspiGemcam.sudo /etc/sudoers.d/RaspiGemcam
  sudo chmod 440 /etc/sudoers.d/RaspiGemcam

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

  # setting groups of sitefiles
  # sudo chgrp -R www-data ${PWD}
  sudo chown -R www-data:www-data .

  #create the media directory
  if [[ ! -d media ]]; then
    sudo mkdir media
  fi

  # copy initial overrides, if they do not exist
  if [[ ! -f config/config.overrides.js ]]; then
    sudo cp install/config.overrides.js config/config.overrides.js
  fi

  if [[ ! -f config/raspigemcam.overrides.cfg ]]; then
    sudo cp install/raspigemcam.overrides.cfg config/raspigemcam.overrides.cfg
  fi

  # make directories writable
  sudo chmod 775 ${PWD}/media
  sudo chmod 775 ${PWD}/config

  # notice to reboot if first time install
  echo "If this is a first-time install, please reboot PI"
fi

popd > /dev/null

echo "Done!"

