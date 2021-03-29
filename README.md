# Gemcam: PI HQ Cam with a microscope

Webbased application for the Raspberry Pi and the 12 MP HQ camera for taking stills, especially tailored
for the use with a (gemmological) microscope.

![Alt](docs/connectedtomicroscope-200px.jpg?raw=true )

It is intended to be operated in headless mode over wifi. In this way, only the usb-powercord is attached,
which will not affect the mechanical stability of the camera, reducing vibrations (as an ethernet cable probable will).

## Pre requisites

- Raspberry Pi 3B+ (or better)
- Raspberry PI OS (32bit), with ssh and wifi enabled (https://www.raspberrypi.org/documentation/installation/installing-images/)
- Git installed on the PI (https://linuxize.com/post/how-to-install-git-on-raspberry-pi/)
- HQ camera attached, enabled and tested with raspistill (https://www.raspberrypi.org/documentation/usage/camera/raspicam/raspistill.md)
- Apache and PHP installed (https://www.raspberrypi.org/documentation/remote-access/web-server/apache.md)

## Installation

Clone the repository inside the webroot (normally /var/www/html). In the webroot on the pi enter:
```
git clone https://github.com/henkrijneveld/Gemcam.git gemcam
```
Go to the install directory and execute the install script
```
cd install
./install.sh
```

Go to your browser:
```
http://<ip or name of connected pi>/gemcam
```
Then click the Start Camera button. A picture should be visible (if camera attached).

Errors? open the console log in your browser (F12 key)

Any user configuration can be done in config/config.overrides.js and config/raspigemcam.overrides.cfg


## Upgrading

Go to the installation directory from the webroot, and enter a git pull. Example:
```
cd /var/www/html/gemcam
git pull
```

## Usage

When using a microscope with standard foto software, I ran into the inconvenience that it was necessary to
note seperately the material, the magnification and other parameters. Later on I had to change the filename, leading
to mistakes and a very cumbursome process. Gemcam let you specify the filename with alle relevant information. This results
in meaningfull filenames like: garnet-1.5x-0.5R-inclusion-20210321-210304.jpg. Files are downloaded to your system,
and stored in a mediafolder on the Pi itself.

The second problem using the camera's is focussing. A gemmological stereo microscope has objectives somewhat tilted from the 
horizontal plane to achieve the 3D effect. In gemcam, you see a preview (in reduced resolution, 1024px vs 4060px).
However, with a 400% magnification it is possible to get good focussing.

The whitebalance is an other issue. Through the microscope you can seldom use the balancing out of the box. Gemcam
let you manually select the gains in red and blue (green stays constant as part of the design of the HQ camera).
By carefully obsering the image, comparing it to the image in the microscope it can be fine tuned to achieve the 
right colors. Note that white balancing is processed on the camera, so 10 or 12 bits are used (raw processing).

The other controls can be set to get the most detail and dynamic range. Look at the live-histogram to avoid clipping.

![Alt](docs/bumblbee-fov3mm.jpg?raw=true )
Air bubbles in resin filled cavity of a bumlbee jasper (horizontal field of view 3mm).

Not that the primary driver for the quality of the picture is the reduction lens between microscope and camera. I use
a rather cheap model. Before I finished gemcam, it was less noticable...

## Development

The software was developed with phpstorm, and the pi was connected as a remote server.

The UI can be developed (for a part) with no PI connected. Go to the docker subdirectory and start:
```
cd /var/www/html/gemcam/docker
# start docker
./start.sh

# refresh docker after changes to the docker files itself
./refresh.sh

# enter the docker image
./gotowebserver.sh

# stop and remove all containers on your PC 
./stopandremove.sh
```

You can enter the testsystem on localhost. When the software detects that localhost is used, it will show two
images as testimage. Note, that the camerasettings can be adapted, but will have no effect (the settings are processed
in the camera modul itself, so when it is not attached, nothing will happen in the test environment)


## Security

None, anybody on the same (w)lan can access the camera.

The application is meant to be connected to a pc in the direct vicinity of the microscope/camera. All security
must be implemented by using a dedicated wifi wlan. For technical reasons, the apache user (www-data) runs with
full sudo rights, no password necessary. Making this secure would require a lot of extra effort with no pay-off
in this use case. Highly recommended to not make this application available on a broader network.

## Known issues and limitations

- It is tested only on my own systems: 2 Raspberry 3B+ with a camera connected. I expect some difficulties for
  first time users.
- This is my first Vue application. There are still some quirks in the event handling. It runs with vue.js in
  development mode.
- Error messages on the UI itself are almost absent. When an error occurs, it is best to go to the development tools
    in the browser (F12 key), and inspect the log in the console.
- Shutter speed, analog gain and digital gain are not implemented yet. They work in conjunction, and the latter
two are not implemented in the camera driver (raspigemcam), yet.
- On firefox, after longer use I noticed sometimes the network performance of the application degrades. 

# Acknowledgements

The mediabrowser is the "Tiny File Manager" script (https://tinyfilemanager.github.io), renamed to index.php
in php/filemanager. The config.php is adapted to automatically set the media directory to the media
subdirectory under the site root.

The gemcamdriver is from https://github.com/henkrijneveld/userland, subdir raspigemcam-bin. It is a
non-backwards compatible adapted copy from raspimjpeg. For more information, see the readme
accompanying the aforementioned repository.

The vue script is from vuejs.org

The general idea of gemcam is based on RPi_Cam_Web_Interface (https://github.com/silvanmelchior/RPi_Cam_Web_Interface).
This is a very generic application with a lot of functionality of no use for still fotography. I considered the userinterface
suboptimal for my goals. Unfortunately, the UI was based on plain javascript and ajax. Vue seems a better choice nowadays.
The wiki of this project can be of use: https://elinux.org/RPi-Cam-Web-Interface







