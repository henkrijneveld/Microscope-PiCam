<?php

namespace api;

class Config
{
	public static $mempath = "/dev/shm/gemcam"; // memory mapped files: transient to protect the SD card from wear
	public static $mediadir = "/gemcam/media"; // file where the high res images are saved, relative to documentroot
	public static $fifofile = "/gemcam/system/FIFO"; // FIFO file for communication with RASPIMJPEG relative to documentroot
}


