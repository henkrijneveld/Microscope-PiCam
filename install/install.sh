# rudimentary installer
# installs to /var/www/camera
# no extra facilities for virtual hosts etc
#
# software is intended for dedicate PI attached to camera

# create the control pipe
if [ ! -e /var/www/gemcam/system/FIFO ]; then
   sudo mknod /var/www/gemcam/system/FIFO p
fi
sudo chmod 666 /var/www/gemcam/system/FIFO

# this is a 1-1 copy from RPi_Cam with the user config changed to this installation
sudo cp raspimjpeg.global /etc/raspimjpeg

# setting groups of sitefiles
sudo chgrp -R www-data /var/www/gemcam

# make directories writable
sudo chmod 775 /var/www/gemcam/media
sudo chmod 775 /var/www/gemcam/config
