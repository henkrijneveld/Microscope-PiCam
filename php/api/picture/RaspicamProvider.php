<?php

namespace api\picture;

use api\control\RaspiCamControl as CamControl;
use api\Config as Cfg;

class RaspicamProvider implements ProviderInterface
{
	function getStreamImage()
    {
	    header("Access-Control-Allow-Origin: *");
	    header("Content-Type: image/jpeg");
	    readfile(Cfg::$mempath."/cam.jpg");
    }

    // @TODO: logic to only get the file, return it, and delete it from media
	  function getShotImage($filename)
    {
	    $cc = new CamControl;

	    $cc->takeImage();

	    $files = scandir( $_SERVER["DOCUMENT_ROOT"].Cfg::$mediadir, SCANDIR_SORT_DESCENDING);
	    foreach ($files as $file) {
		    if (!strchr($file, ".th."))
			    break;
	    }
	    if (strchr($file, ".jpg")) {
		    header("Access-Control-Allow-Origin: *");
		    header("Content-Type: image/jpeg");
		    if ($filename) {
		    	$oldname = $_SERVER["DOCUMENT_ROOT"].Cfg::$mediadir."/".$file;
		    	$fname = $_SERVER["DOCUMENT_ROOT"].Cfg::$mediadir."/".$filename;
		    	rename($oldname, $fname);
		    } else {
			    $fname =  $_SERVER["DOCUMENT_ROOT"].Cfg::$mediadir."/".$file;
		    }
		    readfile($fname);
	    } else {
	    	echo "";
	    }
    }
}
