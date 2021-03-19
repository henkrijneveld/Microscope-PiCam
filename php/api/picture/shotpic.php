<?php
// debughelper on in fireox
// error in server
// for next time
include_once "../../autoloader.php"; // somewhat clunky, acceptable for the time being

use api\picture\StaticProvider as StaticProvider;
use api\picture\RaspicamProvider as RaspicamProvider;

if (isset($_GET['demo']) && intval($_GET['demo']) == 1) {
	$provider = new StaticProvider;
}	else {
	$provider = new RaspicamProvider;
}

$filename = "";
if (isset($_GET['fn'])) $filename = $_GET['fn'];

$provider->getShotImage($filename);
