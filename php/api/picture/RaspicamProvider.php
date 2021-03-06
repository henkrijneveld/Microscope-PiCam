<?php
// SPDX-FileCopyrightText: 2021- Henk Rijneveld <henk@henkrijneveld.nl>
// SPDX-License-Identifier: MIT

namespace api\picture;

use api\control\RaspiCamControl as CamControl;
use api\Config as Config;

class RaspicamProvider implements ProviderInterface
{
	function getStreamImage()
    {
	    header("Access-Control-Allow-Origin: *");
	    header("Content-Type: image/jpeg");
	    readfile(Config::getMemPath()."/cam.jpg");
    }

    function getShotImage($filename)
    {
	    $cc = new CamControl;

	    $cc->takeImage();
	    $files = scandir( Config::getMediaDir(), SCANDIR_SORT_DESCENDING);
	    foreach ($files as $file) {
		    if (!strchr($file, ".th.") && (substr($file, 0, 3) === "im_"))
			    break;
	    }
	    if (strchr($file, ".jpg")) {
		    header("Access-Control-Allow-Origin: *");
		    header("Content-Type: image/jpeg");
		    if ($filename) {
		    	$oldname = Config::getMediaDir()."/".$file;
		    	$fname = Config::getMediaDir()."/".$filename;
		    	rename($oldname, $fname);
		    } else {
			    $fname = Config::getMediaDir()."/".$file;
		    }
		    readfile($fname);
	    } else {
	    	echo "";
	    }
    }
}
