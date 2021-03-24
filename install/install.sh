# rudimentary installer
# installs to /var/www/camera
# no extra facilities for virtual hosts etc
#
# software is intended for dedicate PI attached to camera

# make sure www-data is member of sudo
# security risk when cam is used in public network
sudo adduser www-data sudo > /dev/null
sudo rm /etc/sudoers.d/RaspiGemcam
sudo cp RaspiGemcam.sudo /etc/sudoers.d/RaspiGemcam
sudo chmod 440 /etc/sudoers.d/RaspiGemcam

# create the control pipe
if [ -e /var/www/gemcam/system/FIFO ]; then
  sudo rm /var/www/gemcam/system/FIFO
fi
sudo mknod /var/www/gemcam/system/FIFO p
sudo chmod 666 /var/www/gemcam/system/FIFO

# @TODO: change raspigemcam.c that the global config can be a parameter at startup
# @TODO: add a startup parameter as base path to raspigemcam.
sudo cp raspigemcam.global.cfg /etc/raspigemcam

# copy the program to system
sudo cp raspigemcam ../system
sudo chmod +x ../system/raspigemcam

# setting groups of sitefiles
sudo chgrp -R www-data /var/www/gemcam

# make directories writable
sudo chmod 775 /var/www/gemcam/media
sudo chmod 775 /var/www/gemcam/config
