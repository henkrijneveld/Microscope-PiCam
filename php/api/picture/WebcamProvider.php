<?php

namespace api\picture;


class WebcamProvider implements ProviderInterface
{
    function getStreamImage()
    {
//    exec('/usr/bin/fswebcam --set brightness=70% --set contrast=10% --set saturation=50% -r 1280x720 --no-banner /tmp/webcam/image1280.jpg');
      exec('/usr/bin/fswebcam -r 1280x720 --no-banner /tmp/webcam/image1280.jpg');
      // exec('/usr/bin/fswebcam -l 1 -b -r 320x240 --no-banner /tmp/webcam/image320.jpg');
      // exec('/usr/bin/fswebcam -r 320x240 --no-banner /tmp/webcam/image320.jpg');

      $image = file_get_contents('/tmp/webcam/image1280.jpg');

      header('content-type: image/jpeg');
      echo $image;
    }

    function getShotImage($filename)
    {
      $this->getStreamImage();
    }
}
