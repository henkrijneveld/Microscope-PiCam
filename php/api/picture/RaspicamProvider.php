<?php

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

	    $files = scandir( $_SERVER["DOCUMENT_ROOT"].Config::getMediaDir(), SCANDIR_SORT_DESCENDING);
	    foreach ($files as $file) {
		    if (!strchr($file, ".th."))
			    break;
	    }
	    if (strchr($file, ".jpg")) {
		    header("Access-Control-Allow-Origin: *");
		    header("Content-Type: image/jpeg");
		    if ($filename) {
		    	$oldname = $_SERVER["DOCUMENT_ROOT"].Config::getMediaDir()."/".$file;
		    	$fname = $_SERVER["DOCUMENT_ROOT"].Config::getMediaDir()."/".$filename;
		    	rename($oldname, $fname);
		    } else {
			    $fname =  $_SERVER["DOCUMENT_ROOT"].Config::getMediaDir()."/".$file;
		    }
		    readfile($fname);
	    } else {
	    	echo "";
	    }
    }
}
