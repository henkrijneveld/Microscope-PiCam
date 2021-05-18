<?php
// SPDX-FileCopyrightText: 2021- Henk Rijneveld <henk@henkrijneveld.nl>
// SPDX-License-Identifier: MIT

namespace api\picture;

class StaticProvider implements ProviderInterface
{
  function getStreamImage()
  {
			#$pic1 = "doorvallend-tourmalijn-0.5-4.5-2xobj-small.jpg";
			#$pic2 = "other-small.jpg";

		  $pic1 = "other.jpg";
		  $pic2 = "other-small.jpg";

			$pic = time() % 2 ? $pic1 : $pic2;

      if (file_exists($pic)) {
          //Set the content-type header as appropriate
	        header('content-type: image/jpeg');

          //Set the content-length header
          header('Content-Length: ' . filesize($pic));

          //Write the image bytes to the client
          readfile($pic);
      }
      else { // Image file not found

          header($_SERVER["SERVER_PROTOCOL"] . " 404 Not Found");

      }
  }

	function getShotImage($filename)
	{
		$this->getStreamImage();
	}
}